import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';

const { makeDataPath } = await setupData('2021-09');

const files = Deno.args;

function parseDay(raw: { [key: string]: any }) {
  const { Date: date, impressions, engagements, retweets, replies, likes } = raw;
  return {
    date,
    impressions,
    engagements,
    retweets,
    replies,
    likes,
  };
}

const result = [];

for (const file of files) {
  const data = await readCSV(file);
  result.push(...data.map(parseDay));
}

await writeCSV(makeDataPath('twitter.csv'), result.sort((a, b) => a.date.localeCompare(b.date)));
