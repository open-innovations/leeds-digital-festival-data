# Google Analytics Data

## Preparing report

Generate a report with the following config:

<dl>
  <dt>Dimensions</dt>
  <dd>Date</dd>
  <dt>Metrics</dt>
  <dd>Users</dd>
  <dd>Page Views</dd>
  <dd>Unique Page Views</dd>
</dl>

On the view, select the date range required, Expand the number of rows shown to include all required dates and sort as needed (by date is ideal!). Click __Export__ and select __CSV__.

## Processing the report

1. Move the exported data into `working/website` (this directory). Note that the `.gitignore` in the parent directory prevents CSV files being checked in.
2. Run `python ./scripts/metrics/website.py`.
3. Cleaned data will be stored in `data\social\website.csv`, a monthly summary of the data will be stored in `src\_data\metrics\website\monthly.csv`.