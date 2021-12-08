import { readCSV, writeJSON } from 'https://deno.land/x/flat/mod.ts';
import { dataFile, setupData } from './util.ts';

const { makeDataPath } = await setupData('services');

const [mailData, linkedinUpdates, linkedinVisitors, twitter, website] =
  await Promise.all(
    [
      'automated-email-campaigns.csv',
      'linkedin-updates.csv',
      'linkedin-visitors.csv',
      'twitter.csv',
      'website.csv',
    ]
      .map((x) => `data/services/${x}`)
      .map((x) => readCSV(x))
  );

let data: any = {};

const prepareDataField = (ns: string) => (o: any) =>
  Object.fromEntries(Object.entries(o).map(([k, v]: any) => [`${ns}-${k}`, parseInt(v, 10)]));
const reducer =
  (ns: string, datefieldName: string = 'date') =>
  (agg: any, { [datefieldName]: date, ...values }: any) => ({
    ...agg,
    [date]: { ...agg[date], ...prepareDataField(ns)(values) },
  });

data = linkedinUpdates.reduce(reducer('linkedin'), data);
data = linkedinVisitors.reduce(reducer('linkedin'), data);
data = twitter.reduce(reducer('twitter'), data);
data = website.reduce(reducer('website'), data);

await writeJSON(makeDataPath('all-services.json'), data, null, 2);
