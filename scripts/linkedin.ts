import { readXLSX, xlsx, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';

const { makeDataPath } = await setupData('services');

function parseDate(date: string) {
  const [m, d, y] = date.split('/');
  return `${y}-${m}-${d}`;
}

const [visitorsFile, updatesFile, rest] = Deno.args;

const updatesWorkbook = await readXLSX(updatesFile);
const updateData = xlsx.utils.sheet_to_json(
  updatesWorkbook.Sheets[updatesWorkbook.SheetNames[0]],
  {
    range: 1,
  }
);

const visitorWorkbook = await readXLSX(visitorsFile);
const visitorData = xlsx.utils.sheet_to_json(
  visitorWorkbook.Sheets[visitorWorkbook.SheetNames[0]]
);

function processVisitors(raw: any) {
  const {
    Date: date,
    'Total page views (total)': total_page_views_total,
    'Total unique visitors (total)': total_unique_visitors_total,
  } = raw;
  return {
    date: parseDate(date),
    total_page_views_total,
    total_unique_visitors_total,
  };
}

function processUpdates(raw: any) {
  const {
    Date: date,
    'Impressions (total)': impressions_total,
    'Clicks (total)': clicks_total,
    'Reactions (total)': reactions_total,
    'Comments (total)': comments_total,
    'Shares (total)': shares_total,
    'Engagement rate (total)': engagement_rate_total,
  } = raw;

  return {
    date: parseDate(date),
    impressions_total,
    clicks_total,
    reactions_total,
    comments_total,
    shares_total,
    engagement_rate_total: (engagement_rate_total as Number).toFixed(3),
  };
}

await writeCSV(
  makeDataPath('linkedin-visitors.csv'),
  visitorData.map(processVisitors)
);

await writeCSV(
  makeDataPath('linkedin-updates.csv'),
  updateData.map(processUpdates)
);
