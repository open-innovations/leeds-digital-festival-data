import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';
const { makeDataPath } = await setupData('services');

const filename = Deno.args[0];

const parseDate = (date: string) => {
  const [ m, d, y ] = date.split('/')
  return `${y}-${m}-${d}`;
};

const websiteData = (await readCSV(filename)).map((d: any) => ({
  date: parseDate(d['Day Index']),
  users: parseInt(d['Users'].replace(',', '')),
  pageviews: parseInt(d['Pageviews'].replace(',', '')),
}));

await writeCSV(makeDataPath('website.csv'), websiteData)
