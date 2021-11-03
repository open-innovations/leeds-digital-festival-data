# Processing scripts

This directory contains scripts which transform the data from the raw data sources into the
data folder as either JSON or CSV files.

## Prerequisites

Install [`deno`](https://deno.land/), which is a secure javascript runtime.

## Returns data

1. Download the returns data from the Google Sheet and save in the `working` folder.
2. Run the following script

```
deno run --allow-read --allow-write --unstable scripts/process-returns-xxxx.ts "<path to returns xlsx>"
```