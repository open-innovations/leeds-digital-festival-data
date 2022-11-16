import os
from tkinter import W
import pandas as pd
import glob
import yaml

WORKING_DIR = os.path.join('working', 'twitter')
DATA_DIR = os.path.join('data', 'social')
RAW_FILE = os.path.join(DATA_DIR, 'twitter.csv')
VIEW_DIR = os.path.join('src', '_data', 'metrics', 'twitter')
LOCAL_VIEW_DIR = os.path.join('src','report','september-2022','_data')


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
    START_DATE = '2021-10-01'
    END_DATE = '2022-10-01'
    data = data[data.date.between(START_DATE,END_DATE)]
    monthly = data.groupby('month')
    monthly_summary = pd.DataFrame({
        'tweets_published': monthly.tweets_published.sum(),
        'impressions': monthly.impressions.sum(),
        'engagements': monthly.engagements.sum(),
        'engagement_rate': monthly.engagement_rate.sum(),
        'retweets': monthly.retweets.sum(),
        'likes': monthly.likes.sum(),
        'user_profile_clicks': monthly.user_profile_clicks.sum(),
        'follows': monthly.follows.sum(),
    })
    monthly_summary.to_csv('monthly.csv')

def create_summary_metrics():
    START_DATE = '2022-08-01'
    END_DATE = '2022-10-01'
    os.makedirs(LOCAL_VIEW_DIR, exist_ok=True)
    os.chdir('../../../../')

    data = read_existing()
    data.reset_index(inplace=True)

    os.chdir(LOCAL_VIEW_DIR)
    data = data[data.date.between(START_DATE,END_DATE)]
    with open('social.yml','r') as metrics_file:
        metrics = yaml.safe_load(metrics_file)

    metrics['twitter']['impressions'] = int(data.impressions.sum())
    metrics['twitter']['engagements'] = int(data.engagements.sum())
    metrics['twitter']['tweets_published'] = int(data.tweets_published.sum())
    metrics['twitter']['engagement_rate'] = int(data.engagement_rate.sum())
    metrics['twitter']['retweets'] = int(data.retweets.sum())
    metrics['twitter']['likes'] = int(data.likes.sum())
    metrics['twitter']['user_profile_clicks'] = int(data.user_profile_clicks.sum())
    metrics['twitter']['follows'] = int(data.follows.sum())

    
    with open('social.yml','w') as metrics_file:
        yaml.safe_dump(metrics,metrics_file,default_flow_style=False)

if __name__ == '__main__':
    update_raw_data()
    create_summary()
    create_summary_metrics()
