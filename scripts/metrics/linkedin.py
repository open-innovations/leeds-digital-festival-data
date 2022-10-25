import os
import pandas as pd
import glob

WORKING_DIR = os.path.join('working', 'linkedin')
DATA_DIR = os.path.join('data', 'social')
RAW_FILE_UPDATES = os.path.join(DATA_DIR, 'linkedin-updates.csv')
RAW_FILE_VISITORS = os.path.join(DATA_DIR, 'linkedin-visitors.csv')
VIEW_UPDATES = os.path.join('src', '_data', 'metrics', 'linkedin', 'updates')
VIEW_VISITORS = os.path.join('src', '_data', 'metrics', 'linkedin', 'visitors')

WORKING_VISITORS = os.path.join(WORKING_DIR, 'visitors', 'linkedin-visitors.xls')


def read_existing_file(filename):
    try:
        data = pd.read_csv(filename, index_col=['date'], parse_dates=['date'])
    except:
        data = pd.DataFrame(None)
    return data

def read_existing_visitors():
    return read_existing_file(RAW_FILE_VISITORS)

def read_existing_updates():
    return read_existing_file(RAW_FILE_UPDATES)

def save_existing(data, filename):
    os.makedirs(DATA_DIR, exist_ok=True)
    data.to_csv(filename)

def load_file(filename, columns, sheet_name=0, skiprows=None):
    data = pd.read_excel(filename, sheet_name=sheet_name, parse_dates=['Date'], skiprows=skiprows, index_col=0)

    data.index = data.index.set_names(
        [x.lower().replace('\s+', '_') for x in data.index.names])
    data.columns = data.columns.str.lower().str.replace('\s+', '_', regex=True).str.replace(r'[\(\)]','', regex=True)
    data = data[columns]
    data = data.round(2)
    return data


def update_raw_data_visitors():
    files = glob.glob(os.path.join(WORKING_DIR, 'visitors', '*.xls'))

    if (len(files) == 0):
        print('Nothing to do! No new files found in "{}".'.format(WORKING_DIR))
        return

    data_visitors = read_existing_file(RAW_FILE_VISITORS)

    new_data = pd.concat([load_file(file, skiprows=0, columns=[
        'total_page_views_total',
        'total_unique_visitors_total'
    ]) for file in files]) # This will concat both updates and visitors - seperate directoies?

    data_visitors = new_data.combine_first(data_visitors)

    data_visitors = data_visitors.sort_values(by=['date'])

    save_existing(data_visitors, RAW_FILE_VISITORS)

def update_raw_data_updates():
    files = glob.glob(os.path.join(WORKING_DIR, 'updates', '*.xls'))

    if (len(files) == 0):
        print('Nothing to do! No new files found in "{}".'.format(WORKING_DIR))
        return

    data_updates = read_existing_file(RAW_FILE_UPDATES)

    new_data = pd.concat([load_file(file, skiprows=1, columns=[
        'impressions_total',
        'clicks_total',
        'reactions_total',
        'comments_total',
        'reposts_total',
        'engagement_rate_total'
    ]) for file in files]) # This will concat both updates and visitors - seperate directoies?

    data_updates = new_data.combine_first(data_updates)

    data_updates = data_updates.sort_values(by=['date'])

    save_existing(data_updates, RAW_FILE_UPDATES)
    

def create_summary_updates():
    os.makedirs(VIEW_UPDATES, exist_ok=True)

    data = read_existing_updates()
    data.reset_index(inplace=True)
    data.date = pd.to_datetime(data.date)

    # Save summaries
    os.chdir(VIEW_UPDATES)

    # Create monthly summary
    data['month'] = data.date.dt.to_period('M')
    monthly = data.groupby('month')
    monthly_summary = pd.DataFrame({
        'impressions_total': monthly.impressions_total.sum(),
        'clicks_total': monthly.clicks_total.sum(),
        'reactions_total': monthly.reactions_total.sum(),
        'comments_total': monthly.comments_total.sum(),
        'reposts_total': monthly.reposts_total.sum(),
        'engagement_rate_total': monthly.engagement_rate_total.sum(),
    })
    monthly_summary.to_csv('updates_monthly.csv')

def create_summary_visitors():
    os.makedirs(VIEW_VISITORS, exist_ok=True)

    data = read_existing_visitors()
    data.reset_index(inplace=True)
    data.date = pd.to_datetime(data.date)

    # Save summaries
    os.chdir(VIEW_VISITORS)

    # Create monthly summary
    data['month'] = data.date.dt.to_period('M')
    monthly = data.groupby('month')
    monthly_summary = pd.DataFrame({
        'total_page_views_total': monthly.total_page_views_total.sum(),
        'total_unique_visitors_total': monthly.total_unique_visitors_total.sum(),
    })
    monthly_summary.to_csv('visitors_monthly.csv')



if __name__ == '__main__':
    update_raw_data_updates()
    update_raw_data_visitors()
    create_summary_updates()
    create_summary_visitors()
