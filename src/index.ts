import * as React from "react";

import TestComponent from "./TestComponent";
// import DayComponent from "./DayComponent";
// import EventComponent from "./EventComponent";
// import HeadersComponent from "./HeadersComponent";
// import RowComponent from "./RowComponent";
import CalendarComponent from "./CalendarComponent";
// import TitleComponent from "./TitleComponent";
import {
  // RowProps,
  // DateObjectWithEvent,
  // CalendarEvent,
  // DayProps,
  // DateObject,
  // StateObject,
  CalendarProps,
  // HeaderProps,
  // Dimensions,
  // TitleProps,
  // EventProps
} from "./interfaces";

export const ReCalendar: React.FunctionComponent<CalendarProps> = CalendarComponent;
export const Test: React.ComponentClass<any> = TestComponent;
