---
layout: default
permalink: design-notes/feedback
---
<style>
  p, ul, table {
    margin-top: 1em;
    margin-bottom: 1em;
  }
  ul {
    list-style: disc;
    padding-left: 2rem;
  }
  td, th {
    padding: 0.2rem 0.5rem;
    border: 1px solid black;
  }
</style>

# Feedback Form Design

The feedback form has two purposes:

* Understanding the host's experience
* Assessing the coverage of events

One problem from earlier versions of the form that people who hosted multiple events were
unable to distinguish between their events. On that basis, we recommend separating Host
and Event feedback into two separate forms - the host form needs to be sent in once only,
and the event sent in for each event.

The design of each form should be simple and clear to navigate, with field validation and
minimising the fields that the user needs to submit.

## Host Feedback

The host feedback items are as follows. These are mostly OK, and are not used to drive the
data dashboard. A little bit of cleaning up may be required.

| Number | Question | Details | Comments |
|:------:|----------|:-------:|----------|
| Q1 | Name | | |
| Q2 | Role | | |
| Q3 | Organisation | | |
| Q3 | Email | | |
| Q4 | Was this your first time hosting an event(s) as part of Leeds Digital Festival? | Yes, No (Hosted at last festival), No (Hosted a year ago), No (Hosted at other time) | These are OK |
| Q6.1 | Based on your hosting experience, are you planning to submit an event for next year's Festival? | Y/N |  |
| Q6.2 | Why? | Optional Text | |
| Q7 | Based on your experience this year, if hosting an event at next year's Festival, what event format would you select? | Physical, Virtual, Multiple, Any, Undecided | |
| Q8 | Was the involvement valuable to your organisation? | Y / N / Other | Wonder about the wisdom of Other here? |
| Q9 | Do you have any additional comments or feedback about your experience of hosting an event at Leeds Digital Festival? | | |
| Q10 | Do you have any tips for organisations looking to host a Leeds Digital Festival event? | | |
| Q11 | How did you hear about Leeds Digital Festival? | | |
| Q12 | Would you be interested in finding out more about sponsorship opportunities for the 2022 Festival | | |
| Q13 | Were you satisfied with the number of people who registered for your events? | Y/N | |
| Q14 | Were you satisfied with the number of people who attended your events? | Y/N | |
| Q15 | What, if anything, do you feel could have increased the number of people who attended your events? | Optional Text | |

## Event Feedback

The contents in the table are more or less OK.

| Number | Question | Details | Comments |
|:------:|----------|:-------:|----------|
| Q0.1 | Your email address | Text | Allows linking to host |
| Q0.2 | Event title | Text | Allows linking to CMS |
| Q1 | What format was your event? | Physical / Virtual / Hybrid | Per-event means that the options about multiple events can be removed |
| Q2.1 | If you hosted a Virtual or Hybrid event, which platform did you use to host your event? | Pick list of common platforms 'Other' option | Conditional on Q1, if possible |
| Q2.2 | Why did you chose this platform? | Optional text | Conditional on Q1, if possible |
| Q3 | How many people were registered for your event? | Optional Numeric | Text to suggest this can be approximate |
| Q4 | How many people attended your event? | Optional Numeric | Text to suggest this can be approximate |
| Q5 | Please outline the age break-down of your audience | Mostly older - Largely older - Balanced - Largely younger - Mostly younger | This was not useful before. Needs a simple coding. |
| Q6 | Please outline the gender break-down of your audience | Mostly male - largely male - balanced - largely female - mostly female | This was not useful before. Needs a simple coding. |
| Q7 | Please identify the regions within the UK that your event welcomed attendees | LIST OF UK REGIONS | |
| Q8 | Did your event welcome any attendees from outside of the UK? | LIST OF: Europe, North America, South America, Australasia, Far East, India | Is there a good right-sized list? Do we need an Other box? |


There are some refinements that could do with being made to these fields:

* Please provide any further information on the demography of your audience, where possible:
* Were you satisfied with the demographic that your event attracted? 