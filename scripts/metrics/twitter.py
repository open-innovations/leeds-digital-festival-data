import os
import pandas as pd
import glob


WORKING_DIR = os.path.join('working', 'twitter')
OUTPUT_DIR = os.path.join('data', 'twitter')
RAW_FILE = os.path.join(OUTPUT_DIR, 'twitter.csv')

files = glob.glob(os.path.join(WORKING_DIR, '*.csv'))

def read_existing():
    data = None
    return data

def save_existing(data):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    data.to_csv(RAW_FILE)

def load_file(filename):
    data = pd.read_csv(filename, parse_dates=['Date'], index_col=['Date'], na_values=['-'])
    data.index = data.index.set_names([x.lower().replace('\s+', '_') for x in data.index.names])
    data.columns = data.columns.str.lower().str.replace('\s+', '_', regex=True)
    return data

data = read_existing()

if (data == None):
    data = pd.concat([load_file(file) for file in files]).sort_values(by=['date'])

save_existing(data)