---
layout: default
permalink: design-notes/feedback
---
<style>
  p, ul {
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

* **Name**
* **Role**
* **Organisation**
* **Email**
* **First time host?** Yes, No (Hosted at last festival), No (Hosted a year ago), No (Hosted at other time)  
  These are OK
* **Planning to submit again** Y/N and Why  
  Why should be optional.
* **What format** Physical / Virtual
* **Was the involvement valuable?** Y / N / Other  
  Wonder about the wisdom of Other here?
* **Do you have any additional comments or feedback about your experience of hosting an event at Leeds Digital Festival?**
* **Do you have any tips for organisations looking to host a Leeds Digital Festival event?**
* **How did you hear about Leeds Digital Festival?**  
* **Would you be interested in finding out more about sponsorship opportunities for the 2022 Festival?**

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
| _Q5_ | Were you satisfied with the number of people who registered for this event? | Y/N | DO WE NEED THIS? |
| _Q6_ | Were you satisfied with the number of people who attended this event? | Y/N | DO WE NEED THIS? |
| _Q7_ | What, if anything, do you feel could have increased the number of people who attended this event? | Optional Text | BENEFIT OF THIS? |

There are some refinements that could do with being made to these fields:

* Please outline the age break-down of your audience in as much detail as possible eg. numbers of people aged 18-25, 26-35, 35-50, 50+:
* Please outline the gender break-down of your audience in as much detail as possible, eg. number of female / male / other attendees:
* Please provide any further information on the demography of your audience, where possible:
* Please identify the regions within the UK that your event welcomed attendees from:
* Did your event welcome any attendees from outside of the UK? Please select the countries below that your attendees viewed from, and note any countries not listed in the 'Other' box:
* Were you satisfied with the demographic that your event attracted? 