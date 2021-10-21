# `host-returns.json`

The host-returns data file is derived from the surveys that event organisers submitted after the event.

```yaml
{
  "total_returns": count of returns,
  "first_time_ldf_host": count of first time LDF hosts,
  "will_submit_again": count of will submit again,
  "registered": [array of counts of people registered at the event],
  "attended": [array of counts of people attending the event],
  "turnout": [array of turnout at events (between 0 and 1 where 1 is 100% turnout)],
  "uk_region_attendees": [array of reported uk regions],
  "international_attendees": [array of reported country of origin of attendees],
  "event_format": [array of submitted format of event],
  "preferred_format": [array of preferred format of event],
  "platform_used": [array of reported format of event],
  "how_found_out": [array of ways that host found out about LDF]
}
```
