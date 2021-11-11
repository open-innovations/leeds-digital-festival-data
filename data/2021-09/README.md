# Host Returns

_File:_ `host-returns.json`

The host-returns data file is derived from the surveys that event organisers submitted after the event.

```yaml
{
  "total_returns": count of returns,
  "first_time_ldf_host": count of first time LDF hosts,
  "attended": [array of counts of people attending the event],
  "uk_region_attendees": { key value pairs of counts reported for each region },
  "international_attendees": { key value pairs of counts reported for each international area },
  "event_format": { key value pairs of counts of each format },
  "preferred_format": { key value pairs of counts of each preferred format },
  "platform_used": { key value pairs of counts of platform used },
  "how_found_out": { key value pairs of counts of way people found out }
}
```

Note that the data is returned once per organiser, including those who run more than one event. This means, for example, there is no way of knowing how many sessions had international attendees, merely that an organiser had international attendees. Likewise it is impossible to ascertain how many people attended from a given (UK or international) geography.

# Website Activity

_File:_ `website.csv`

This is a CSV file extracted from a Google Analytics report with the following columns:

| Column | Description | Format |
|--------|-------------|--------|
| `date` | the date being reported | ISO 8601 date formatted (`yyyy-mm-dd`) |
| `users` | Number of unique users reported by Google Analytics | number |
| `pageviews` | Number of pageviews reported by Google Analytics | number |
