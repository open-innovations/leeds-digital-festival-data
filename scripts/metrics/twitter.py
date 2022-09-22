import os
import pandas as pd
import glob


WORKING_DIR = os.path.join('working', 'twitter')
OUTPUT_DIR = os.path.join('data', 'twitter')
SITE_DATA_DIR = os.path.join('src', '_data', 'metrics', 'twitter')
RAW_FILE = os.path.join(OUTPUT_DIR, 'twitter.csv')


def read_existing():
    try:
        data = pd.read_csv(RAW_FILE, index_col=['date'])
    except:
        data = None
    return data


def save_existing(data):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    data.to_csv(RAW_FILE)


def load_file(filename):
    data = pd.read_csv(filename, parse_dates=['Date'], index_col=[
                       'Date'], na_values=['-'])
    data.index = data.index.set_names(
        [x.lower().replace('\s+', '_') for x in data.index.names])
    data.columns = data.columns.str.lower().str.replace('\s+', '_', regex=True)
    return data


def update_raw_data():
    data = read_existing()

    files = glob.glob(os.path.join(WORKING_DIR, '*.csv'))

    if (len(files) == 0):
        print('Nothing to do! No new files found in "{}".'.format(WORKING_DIR))
        return

    if (data == None):
        data = pd.concat([load_file(file)
                         for file in files]).sort_values(by=['date'])

    save_existing(data)


def create_summary():
    os.makedirs(SITE_DATA_DIR, exist_ok=True)

    data = read_existing()
    data.reset_index(inplace=True)
    data.date = pd.to_datetime(data.date)

    # Save summaries
    os.chdir(SITE_DATA_DIR)

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
