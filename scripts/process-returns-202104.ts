// deno-lint-ignore-file camelcase
import { xlsx, readXLSX, writeJSON } from 'https://deno.land/x/flat/mod.ts'
import { setupData } from './util.ts';

const filename = Deno.args[0];

const { makeDataPath } = await setupData('202104');

const workbook = await readXLSX(filename);
const sheetData = workbook.Sheets[workbook.SheetNames[0]];
const data = await xlsx.utils.sheet_to_json(sheetData);

const trueMapper = (x: string) => x === 'Yes';
const identityMapper = (x: string) => x;
const numberMapper = (x: string) => parseInt(x);
const listMapper = (x: string) => x.split(/\s*,\s*/);

const fieldMap: { [originalFieldName: string]: { name: string, processor: (x: string) => any } } = {
  "Was this your first time hosting an event/s as part of Leeds Digital Festival?": {
    name: 'first_time_ldf_host',
    processor: trueMapper,
  },
  "Was this your first time hosting an online event/s?": {
    name: 'first_time_online_host',
    processor: trueMapper,
  },
  "Based on your hosting experience in April, will you be submitting an event for the September festival?": {
    name: 'will_submit_september',
    processor: trueMapper,
  },
  "How many people were registered for your event/s? If you hosted multiple events, please provide the total number.": {
    name: 'registered',
    processor: numberMapper,
  },
  "How many people attended your event/s? If you hosted multiple events, please provide the total number.": {
    name: 'attended',
    processor: numberMapper,
  },
  "Did your event welcome any attendees from outside of the UK? Please select the countries that your attendees viewed from:": {
    name: 'international_attendees',
    processor: listMapper,
  },
  "If Government guidelines permit, in September would you prefer to host a virtual event or a physical event?": {
    name: 'prefer_physical_virtual',
    processor: identityMapper,
  },
  "Which platform did you use to host your event? ": {
    name: 'platform_used',
    processor: identityMapper,
  },
};

const processData = (data: any) => {
  let p = {};
  for (let [k, v] of Object.entries(fieldMap)) {
    const processor = v.processor || function (x) { return x };
    p = { ...p, [v.name]: processor(data[k]) };
  }
  return p;
}
const calculateTurnout = (data: any) => ({ ...data, turnout: parseFloat((data['attended'] / data['registered']).toFixed(2)) })

type ProcessedReturn = {
  first_time_ldf_host: boolean,
  first_time_online_host: boolean,
  will_submit_september: boolean,
  registered: number,
  attended: number,
  turnout: number,
  international_attendees: string[],
  platform_used: string,
  prefer_physical_virtual: string,
};

type ReturnSummary = {
  total_returns: number;
  first_time_ldf_host: number;
  first_time_online_host: number;
  will_submit_september: number;
  registered: number[];
  attended: number[];
  turnout: number[];
  international_attendees: string[];
  platform_used: string[];
  prefer_physical_virtual: {
    [key: string]: number;
  };
};

const summarise = (acc: ReturnSummary, data: ProcessedReturn) => {
  acc['total_returns']++;
  acc['first_time_ldf_host'] += data['first_time_ldf_host'] ? 1 : 0;
  acc['first_time_online_host'] += data['first_time_online_host'] ? 1 : 0;
  acc['will_submit_september'] += data['will_submit_september'] ? 1 : 0;
  acc['registered'].push(data['registered']);
  acc['attended'].push(data['attended']);
  acc['turnout'].push(data['turnout']);
  acc['platform_used'].push(data['platform_used']);
  acc['international_attendees'].push(...data['international_attendees']);
  const pv = data['prefer_physical_virtual'];
  if (!acc['prefer_physical_virtual'][pv]) acc['prefer_physical_virtual'][pv] = 0
  acc['prefer_physical_virtual'][pv]++;
  return acc;
}

const processedData = data.map(processData).map(calculateTurnout).reduce(summarise, {
  total_returns: 0,
  first_time_ldf_host: 0,
  first_time_online_host: 0,
  will_submit_september: 0,
  registered: [],
  attended: [],
  international_attendees: [],
  prefer_physical_virtual: {},
  platform_used: [],
  turnout: [],
});

await writeJSON(makeDataPath('host-returns.json'), processedData);