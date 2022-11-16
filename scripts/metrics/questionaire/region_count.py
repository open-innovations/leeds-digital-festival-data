import pandas as pd
import yaml

REGIONS = ['Yorkshire and The Humber','North East','North West','South East','South West','London','Scotland','Wales','Northern Ireland','East Midlands','West Midlands','East of England']
URL = "https://docs.google.com/spreadsheets/d/1rqdwoyVO1TOHjWfllQYm5JUK9Q8-W233hl1rgMRXxpI/export?format=csv"

data = pd.read_csv(URL)

data = data[data['Full Name'] != 'GILES DRING TEST DATA']
total_reporting = data.shape[0]

data = data[data['Please identify the regions within the UK that your event(s) welcomed attendees from:'].str.contains('|'.join(REGIONS))]
total_reporting_region = data.shape[0]

region_count = (data.rename(columns={'Please identify the regions within the UK that your event(s) welcomed attendees from:' : 'Region'})             
                    .filter(['Region'])
                    .apply(lambda x: x.str.split(',').explode().str.strip())
                    .value_counts(dropna=False)
                    .to_dict()        
)

#Turning tuples in to Strings
region_count = {region[0] : region_count[region] for region in region_count.keys() if region[0] in REGIONS}

#MANUAL - handle odd free form text that contains 'Yorkshire' and 'ALL' - will not be valid for future data
region_count['Yorkshire and The Humber'] = region_count['Yorkshire and The Humber'] + 1
total_reporting_region = total_reporting_region + 1

for region in REGIONS:
    region_count[region] = region_count[region] + 2
total_reporting_region = total_reporting_region + 2


max_region = max(region_count.values())
with open('src\\report\\september-2022\\_data\\attendees.yml','w') as f:
    yaml.safe_dump(region_count,f)

with open('src\\report\\september-2022\\_data.yml','r') as r:
    info = yaml.safe_load(r)

info['statistics']['total_returns'] = total_reporting
info['statistics']['total_returns_region'] = total_reporting_region
info['statistics']['max_attendees'] = max_region

with open('src\\report\\september-2022\\_data.yml','w') as w:
    yaml.safe_dump(info,w)

print(max_region)
print(total_reporting_region)
print(region_count)