// deno-lint-ignore-file camelcase
import { xlsx, readXLSX, writeJSON } from 'https://deno.land/x/flat/mod.ts'
import { setupData } from './util.ts';

const filename = Deno.args[0];

const { makeDataPath } = await setupData('2021-09');

const workbook = await readXLSX(filename);
const sheetData = workbook.Sheets[workbook.SheetNames[0]];
const data = await xlsx.utils.sheet_to_json(sheetData);

const trueMapper = (x: string) => x.match(/^Yes/);
const identityMapper = (x: string) => x;
const numberMapper = (x: string) => parseInt(x);
const listMapper = (x: string) => !x ? [] : x.split(/\s*,\s*/);

const fieldMap: { [originalFieldName: string]: { name: string, processor: (x: string) => any } } = {
  "Was this your first time hosting an event(s) as part of Leeds Digital Festival?": {
    name: 'first_time_ldf_host',
    processor: trueMapper,
  },
  "Based on your hosting experience at the September Festival, are you planning to submit an event for next year's Festival?": {
    name: 'will_submit_again',
    processor: trueMapper,
  },
  "How many people were registered for your event(s)? If you hosted multiple events, please provide the total number:": {
    name: 'registered',
    processor: numberMapper,
  },
  "How many people attended your event(s)? If you hosted multiple events, please provide the total number:": {
    name: 'attended',
    processor: numberMapper,
  },
  "Please identify the regions within the UK that your event welcomed attendees from:": {
    name: 'uk_region_attendees',
    processor: listMapper,
  },
  "Did your event welcome any attendees from outside of the UK? Please select the countries below that your attendees viewed from, and note any countries not listed in the 'Other' box:": {
    name: 'international_attendees',
    processor: listMapper,
  },
  "What format was your event? If you hosted multiple events that were delivered in different formats, please select 'Other' and provide further detail:": {
    name: 'event_format',
    processor: identityMapper,
  },
  "Based on your experience this year, if hosting an event at next year's Festival, what event format would you select? ": {
    name: 'preferred_format',
    processor: identityMapper,
  },
  "If you hosted a Virtual or Hybrid event, which platform did you use to host your event and why? ": {
    name: 'platform_used',
    processor: identityMapper,
  },
  "How did you hear about Leeds Digital Festival?": {
    name: 'how_found_out',
    processor: identityMapper,
  }
};

// Other questions - should we include these?

// "Please outline the age break-down of your audience in as much detail as possible eg. numbers of people aged 18-25, 26-35, 35-50, 50+: "
// "Please outline the gender break-down of your audience in as much detail as possible, eg. number of female / male / other attendees: "
// "Please provide any further information on the demography of your audience, where possible:"
// "Were you satisfied with the demographic that your event attracted? "
// "Would you be interested in finding out more about sponsorship opportunities for the 2022 Festival?"


const processData = (data: any) => {
  let p = {};
  for (const [k, v] of Object.entries(fieldMap)) {
    const processor = v.processor || function (x) { return x };
    p = { ...p, [v.name]: processor(data[k]) };
  }
  return p;
}
const calculateTurnout = (data: any) => ({ ...data, turnout: parseFloat((data['attended'] / data['registered']).toFixed(2)) })

type ProcessedReturn = {
  first_time_ldf_host: boolean;
  will_submit_again: boolean;
  registered: number;
  attended: number;
  turnout: number;
  event_format: string;
  preferred_format: string;
  uk_region_attendees: string[];
  international_attendees: string[];
  platform_used: string;
  how_found_out: string;
};

type ReturnSummary = {
  total_returns: number;
  first_time_ldf_host: number;
  will_submit_again: number;
  registered: number[];
  attended: number[];
  turnout: number[];
  uk_region_attendees: string[];
  international_attendees: string[];
  platform_used: string[];
  event_format: string[],
  preferred_format: string[];
  how_found_out: string[];
};

const summarise = (acc: ReturnSummary, data: ProcessedReturn) => {
  acc['total_returns']++;
  acc['first_time_ldf_host'] += data['first_time_ldf_host'] ? 1 : 0;
  acc['will_submit_again'] += data['will_submit_again'] ? 1 : 0;
  acc['registered'].push(data['registered']);
  acc['attended'].push(data['attended']);
  acc['turnout'].push(data['turnout']);
  acc['uk_region_attendees'].push(...data['uk_region_attendees']);
  acc['international_attendees'].push(...data['international_attendees']);
  acc['platform_used'].push(data['platform_used']);
  acc['preferred_format'].push(data['preferred_format']);
  acc['event_format'].push(data['event_format']);
  acc['how_found_out'].push(data['how_found_out']);
  return acc;
}

const summaryData: ReturnSummary = {
  total_returns: 0,
  first_time_ldf_host: 0,
  will_submit_again: 0,
  registered: [],
  attended: [],
  turnout: [],
  uk_region_attendees: [],
  international_attendees: [],
  event_format: [],
  preferred_format: [],
  platform_used: [],
  how_found_out: [],
};

const processedData = data.map(processData).map(calculateTurnout).reduce(summarise, summaryData);

await writeJSON(makeDataPath('host-returns.json'), processedData);