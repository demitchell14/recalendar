import * as React from "react";
import classnames from "classnames";

import { days } from "./constants";
import { HeaderProps } from "./interfaces";
import calendarStyles from "./styles/calendar.module.scss";

export default function HeadersComponent(props: HeaderProps): JSX.Element {
  const { abbreviate } = props;

  return (
    <tr className={classnames(calendarStyles.row, calendarStyles.ready)}>
      {days.map((day, key) => (
        <th key={key} className={classnames(calendarStyles.column, calendarStyles.header)}>
          {abbreviate ? day.abbr : day.full}
        </th>
      ))}
    </tr>
  );
}
