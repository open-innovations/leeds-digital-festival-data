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
deno run --allow-read --allow-write --unstable scripts/process-returns-xxxx.ts "<path to returns xlsx>"
```

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Dataset" property="dct:title" rel="dct:type">Leeds Digital Festival Data</span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Leeds Digital Festival and Open Innovations</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
