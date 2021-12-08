import { dataFile, setupData } from './util.ts';
import { readCSV, writeCSV } from 'https://deno.land/x/flat/mod.ts';

// Yes - the file is really called that...
const automatedStatsFile = dataFile('AutomatedCamapaign_Stat_Report.csv');

const parseDate = (date: string) =>
  date.replace(
    /(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/,
    (match, day, month, year, hour, minute, second) => new Date(year, month-1, day, hour, minute, second).toISOString()
  );

const automatedCampaigns = (await readCSV(automatedStatsFile))
  .filter((x) => x.IsTestMode == 0)
  .map(
    ({
      EmailSentCount,
      EmailUniqueOpenCount,
      EmailUniqueClickCount,
      DateCreated,
    }: any) => ({
      date: parseDate(DateCreated),
      emailSentCount: EmailSentCount,
      emailUniqueOpen: EmailUniqueOpenCount,
      emailUniqueClick: EmailUniqueClickCount,
    })
  );

const { makeDataPath } = await setupData('services');

await writeCSV(makeDataPath('automated-email-campaigns.csv'), automatedCampaigns);
