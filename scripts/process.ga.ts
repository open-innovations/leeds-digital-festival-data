import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';
const { makeDataPath } = await setupData('2021-09');

const filename = Deno.args[0];

const websiteData = (await readCSV(filename)).map((d: any) => ({
  date: new Date(d['Day Index']).toISOString().split('T')[0],
  users: parseInt(d['Users'].replace(',', '')),
  pageviews: parseInt(d['Pageviews'].replace(',', '')),
}));

await writeCSV(makeDataPath('website.csv'), websiteData)
