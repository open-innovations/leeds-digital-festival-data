import os
import pandas as pd
import glob
from cmath import isnan
import yaml
### Needs xlrd

WORKING_DIR = os.path.join('working', 'linkedin-visitors')
DATA_DIR = os.path.join('data', 'social')
RAW_FILE = os.path.join(DATA_DIR, 'linkedin-visitors.csv')
VIEW_DIR = os.path.join('src', '_data', 'metrics', 'linkedin')
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
    data = pd.read_excel(filename, parse_dates=['Date'], index_col=[0], na_values=['-'])
    data.index = data.index.set_names(
        [x.lower().replace('\s+', '_') for x in data.index.names])
    
    data.columns = data.columns.str.lower().str.replace('\s+', '_', regex=True)
    return data


def update_raw_data():
    files = glob.glob(os.path.join(WORKING_DIR, '*.xls'))

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
    return (data.sort_values(by=['date']))
                


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
        'unique_visitors': monthly["total_unique_visitors_(total)"].sum(),
        'total_views' : monthly["total_page_views_(total)"].sum()
    })
    monthly_summary.to_csv('monthly-visitors.csv')


def create_summary_metrics():
    START_DATE = '2022-08-01'
    END_DATE = '2022-10-01'
    os.chdir('../../../../')
    os.makedirs(LOCAL_VIEW_DIR, exist_ok=True)
    

    data = read_existing()
    data.reset_index(inplace=True)

    os.chdir(LOCAL_VIEW_DIR)
    data = data[data.date.between(START_DATE,END_DATE)]
    with open('social.yml','r') as metrics_file:
        metrics = yaml.safe_load(metrics_file)

    metrics['linkedin']['visitors'] = int(data["total_unique_visitors_(total)"].sum())
    
    with open('social.yml','w') as metrics_file:
        yaml.safe_dump(metrics,metrics_file,default_flow_style=False)

if __name__ == '__main__':
    update_raw_data()
    create_summary()
    create_summary_metrics()