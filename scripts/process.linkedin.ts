import { readXLSX, xlsx, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';

const { makeDataPath } = await setupData('2021-09');

const [visitorsFile, rest] = Deno.args;

const visitorWorkbook = await readXLSX(visitorsFile);

const sheetData = visitorWorkbook.Sheets[visitorWorkbook.SheetNames[0]];
const data = await xlsx.utils.sheet_to_json(sheetData);

function parseData(date: string) {
  const [m, d, y] = date.split('/');
  return `${y}-${m}-${d}`;
}

function processVisitors(raw: any) {
  const { Date: date, 'Total page views (total)': total_page_views_total, 'Total unique visitors (total)': total_unique_visitors_total } = raw;
  return {
    date: parseData(date),
    total_page_views_total,
    total_unique_visitors_total,
  };
}

await writeCSV(
  makeDataPath('linkedin-visitors.csv'),
  data.map(processVisitors)
);
