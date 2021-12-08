import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';
const { makeDataPath } = await setupData('services');

const filename = Deno.args[0];

const parseDate = (date: string) => {
  const [ m, d, y ] = date.split('/').map((x) => parseInt(x, 10));
  const dtObj = new Date(y + (y < 2000 ? 2000 : 0), m-1, d, 12, 0, 0);
  return dtObj.toISOString().split('T').shift();
};

const websiteData = (await readCSV(filename)).map((d: any) => ({
  date: parseDate(d['Day Index']),
  users: parseInt(d['Users'].replace(',', '')),
  pageviews: parseInt(d['Pageviews'].replace(',', '')),
}));

await writeCSV(makeDataPath('website.csv'), websiteData)
