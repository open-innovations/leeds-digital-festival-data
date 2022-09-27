import os
import pandas as pd
import glob


WORKING_DIR = os.path.join('working', 'twitter')
DATA_DIR = os.path.join('data', 'social')
RAW_FILE = os.path.join(DATA_DIR, 'twitter.csv')
VIEW_DIR = os.path.join('src', '_data', 'metrics', 'twitter')


def read_existing():
    try:
        data = pd.read_csv(RAW_FILE, index_col=['date'], parse_dates=['date'])
    except:
        data = pd.DataFrame(None)
    return data


def save_existing(data):
    os.makedirs(DATA_DIR, exist_ok=True)
    data.to_csv(RAW_FILE)


def load_file(filename):
    data = pd.read_csv(filename, parse_dates=['Date'], index_col=[
                       'Date'], na_values=['-'])
    data.index = data.index.set_names(
        [x.lower().replace('\s+', '_') for x in data.index.names])
    data.columns = data.columns.str.lower().str.replace('\s+', '_', regex=True)
    return data


def update_raw_data():
    files = glob.glob(os.path.join(WORKING_DIR, '*.csv'))

    if (len(files) == 0):
        print('Nothing to do! No new files found in "{}".'.format(WORKING_DIR))
        return

    data = read_existing()
    new_data = pd.concat([load_file(file)
                          for file in files])

    data = new_data.combine_first(data)

    data = data.sort_values(by=['date'])

    save_existing(data)


def create_summary():
    os.makedirs(VIEW_DIR, exist_ok=True)

    data = read_existing()
    data.reset_index(inplace=True)
    data.date = pd.to_datetime(data.date)

    # Save summaries
    os.chdir(VIEW_DIR)

    # Create monthly summary
    data['month'] = data.date.dt.to_period('M')
    monthly = data.groupby('month')
    monthly_summary = pd.DataFrame({
        'tweets_published': monthly.tweets_published.sum(),
        'impressions': monthly.impressions.sum(),
        'engagements': monthly.engagements.sum(),
    })
    monthly_summary.to_csv('monthly.csv')


if __name__ == '__main__':
    update_raw_data()
    create_summary()
