import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';
import { setupData } from './util.ts';

const { makeDataPath } = await setupData('services');

const files = Deno.args;

function parseDay(raw: { [key: string]: any }) {
  const {
    Date: date,
    "Tweets published": tweets_published,
    impressions,
    engagements,
    retweets,
    replies,
    likes,
    "promoted impressions": promoted_impressions,
    "promoted engagements": promoted_engagements,
    "promoted retweets": promoted_retweets,
    "promoted replies": promoted_replies,
    "promoted likes": promoted_likes,
  } = raw;

  return {
    date,
    tweets_published,
    impressions,    
    promoted_impressions,
    engagements,
    promoted_engagements,
    retweets,
    promoted_retweets,
    replies,
    promoted_replies,
    likes,
    promoted_likes,
  };
}

const result = [];

for (const file of files) {
  const data = await readCSV(file);
  result.push(...data.map(parseDay));
}

await writeCSV(makeDataPath('twitter.csv'), result.sort((a, b) => a.date.localeCompare(b.date)));
