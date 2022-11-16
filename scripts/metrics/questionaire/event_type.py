import pandas as pd
import yaml

URL = "https://docs.google.com/spreadsheets/d/1rqdwoyVO1TOHjWfllQYm5JUK9Q8-W233hl1rgMRXxpI/export?format=csv"
PATH = 'src\\report\\september-2022\\_data.yml'

type_count = (pd.read_csv(URL).filter(["What format was your event? If you hosted multiple events that were delivered in different formats, please select 'Other' and provide further detail:"])
            .apply(lambda x: x.str.strip().str.replace(' ','_').str.lower())
            .replace('Physical and virtual','Hybrid Event')
            .value_counts()
            .to_dict())

print(type_count)
TYPES = ['physical_event','virtual_event','hybrid_event']
type_count = {type[0] : type_count[type] for type in type_count.keys() if type[0] in TYPES}

#MANUAL - handle odd free form text
type_count['physical_event'] = type_count['physical_event'] + 3
type_count['virtual_event'] = type_count['virtual_event'] + 2
type_count['total'] = type_count['physical_event'] + type_count['virtual_event'] + type_count['hybrid_event']

with open(PATH,'r') as f:
    data = yaml.safe_load(f)

data['statistics']['event_type'] = type_count

with open(PATH,'w') as f:
    yaml.safe_dump(data,f)
    
print(type_count)