# leeds-digital-festival-data

This repository holds data descibing the events and activities surrounding the Leeds Digital Festival.

## Data sources and flows

![](docs/ldf-data-flows.png)

The following data sources will be aggregated

* Force24 - marketing data
* Leeds Digital Festival CMS - Event data
* Google Analytics - website traffic
* LinkedIn & Twitter - social engagement
* Organiser Surveys - attendance and other feedback

## Running the scripts

### Prerequisites

Install [`deno`](https://deno.land/), which is a secure javascript runtime.

### Returns data

1. Download the returns data from the Google Sheet and save in the `working` folder.
2. Run the following script

```
deno run --allow-read --allow-write --unstable scripts/process-returns.ts "<path to returns xlsx>"
```