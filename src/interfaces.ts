import { Dispatch, RefObject, SetStateAction } from "react";

export type StateObject<T> = [T, Dispatch<SetStateAction<T>>];

export interface CalendarProps {
  forceAbbreviation?: boolean;

  startDate?: Date | string | Array<number>;
  onSelected?: (dates: DateObject[]) => any;

  events?: CalendarEvent[];
  eventClicked?: (event: DateObjectWithEvent) => any;

  // unimplemented
  eventSource?: any;
  // unimplemented
  eventSources?: any;
}

export interface DayProps {
  date: DateObject;
  cellRef: RefObject<HTMLTableCellElement>;
  initialized: boolean;

  height?: number;
  width?: number;

  abbreviated?: boolean;

  events: CalendarEvent[];
  eventClicked?: (event: DateObjectWithEvent) => any;

  // onSelected?: (date: Date | Date[]) => any;

  onMouseDown?: (date: Date) => any;
  onMouseUp?: (date: Date) => any;
  onMouseOver?: (date: Date) => any;

  selected?: boolean;
  selecting?: boolean;
}

export interface CalendarEvent {
  startDate: Date | string;
  endDate?: Date | string;

  // unimplemented
  duration?: number | string;

  title?: string;
}

export interface DateObjectWithEvent extends DateObject {
  event: CalendarEvent;
}

export interface EventProps extends CalendarEvent {
  onClick: (event: CalendarEvent) => any;
}

export interface DateObject {
  date: Date;
  thisMonth: boolean;
  today?: boolean;
}

export interface HeaderProps {
  abbreviate?: boolean;
  back?: () => any;
  forward?: () => any;
}

export interface RowProps {
  onResize?: (fn: Function) => any;
  dates: DateObject[];
  abbreviated?: boolean;
  calendarRef: RefObject<HTMLDivElement>;

  selectedDates?: Date[];
  isSelecting?: boolean;

  onDayMouseDown?: (date: Date) => any;
  onDayMouseUp?: (date: Date) => any;
  onDayMouseOver?: (date: Date) => any;

  events: CalendarEvent[];
  eventClicked?: (event: DateObjectWithEvent) => any;
}

export type Dimensions = {
  width?: number;
  height?: number;
};

export interface TitleProps {
  date?: Date;
  onChange: (month: number) => any;
}

export type DayAndMonthArray = {
  full: string;
  abbr: string;
};
