import { DayAndMonthArray } from "./interfaces";
export const days: DayAndMonthArray[] = [
  { full: "Sunday", abbr: "Sun" },
  { full: "Monday", abbr: "Mon" },
  { full: "Tuesday", abbr: "Tue" },
  { full: "Wednesday", abbr: "Wed" },
  { full: "Thursday", abbr: "Thu" },
  { full: "Friday", abbr: "Fri" },
  { full: "Saturday", abbr: "Sat" }
];

export const months: DayAndMonthArray[] = [
  { full: "January", abbr: "Jan" },
  { full: "February", abbr: "Feb" },
  { full: "March", abbr: "Mar" },
  { full: "April", abbr: "Apr" },
  { full: "May", abbr: "May" },
  { full: "June", abbr: "Jun" },
  { full: "July", abbr: "Jul" },
  { full: "August", abbr: "Aug" },
  { full: "September", abbr: "Sep" },
  { full: "October", abbr: "Oct" },
  { full: "November", abbr: "Nov" },
  { full: "December", abbr: "Dec" }
];

export function startOfDay(date: Date | string): Date {
  date = new Date(date.valueOf());
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
}

export function getToday(): Date {
  const date: Date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}

export function addDays(date: Date, days: number): Date {
  date = new Date(date.valueOf());
  date.setDate(date.getDate() + days);

  return date;
}
