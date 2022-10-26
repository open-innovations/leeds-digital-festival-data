import os
import pandas as pd
import glob
from cmath import isnan
### Needs xlrd

WORKING_DIR = os.path.join('working', 'mailing_list')
DATA_DIR = os.path.join('data', 'social')
RAW_FILE = os.path.join(DATA_DIR, 'mailing_list.csv')
VIEW_DIR = os.path.join('src', '_data', 'metrics', 'mailing_list')

def read_existing():
    try:
        data = pd.read_csv(RAW_FILE, index_col=['id'], parse_dates=['datecreated'])
    except:
        data = pd.DataFrame(None)
    return data


def save_existing(data):
    os.makedirs(DATA_DIR, exist_ok=True)
    data.to_csv(RAW_FILE)


def load_file(filename):
    data = pd.read_csv(filename, parse_dates=['DateCreated'], index_col=['Id'], na_values=['-'])
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

    new_data = pd.DataFrame()
    for file in files:
        new_data = load_file(file).combine_first(new_data)

    data = new_data.combine_first(data)

    data = post_combine_process(data)
    
    save_existing(data)

def post_combine_process(data): 
    return (data.sort_values(by=['datecreated']))
                


def create_summary():
    os.makedirs(VIEW_DIR, exist_ok=True)
    
    data = read_existing()
    print(data)
    data.reset_index(inplace=True)
    data.datecreated = pd.to_datetime(data.datecreated)

    # Save summaries
    os.chdir(VIEW_DIR)
    print(data.columns)
    # Create monthly summary
    data['month'] = data.datecreated.dt.to_period('M')
    monthly = data.groupby('month')
    monthly_summary = pd.DataFrame({
        'emails_sent': monthly.emailsentcount.sum(),
    })
    monthly_summary.to_csv('monthly.csv')


if __name__ == '__main__':
    update_raw_data()
    create_summary()