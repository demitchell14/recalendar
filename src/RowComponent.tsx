import * as React from "react";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";

import Day from "./DayComponent";
import {addDays, startOfDay} from "./constants";
import {RowProps, StateObject, Dimensions, CalendarEvent} from "./interfaces";
import styles from "./styles/calendar.module.scss";

export default function RowComponent(props: RowProps): JSX.Element {
  const {
    dates,
    onResize,
    onDayMouseDown,
    onDayMouseOver,
    onDayMouseUp,
    isSelecting,
    selectedDates,
    events,
    eventClicked,
    abbreviated,
      calendarRef,
  } = props;

  const [rowDimensions, setRowDimensions] = useState({
    width: undefined,
    height: undefined
  }) as StateObject<Dimensions>;
  const [cellDimensions, setCellDimensions] = useState({
    width: undefined,
    height: undefined
  }) as StateObject<Dimensions>;
  const [initialized, setInitialized] = useState(false) as StateObject<boolean>;

  const rowRef: RefObject<HTMLTableRowElement | any> = useRef();
  const tdRef: RefObject<HTMLTableCellElement | any> = useRef();

  const resizeRow: (element: HTMLTableRowElement | null) => void = (element) => {
    if (element && element.cells.length > 0) {
      if (calendarRef.current) {
        let borderWidth: string|number = getComputedStyle(element, null).borderLeftWidth; // .getPropertyValue('border-left-width');
        borderWidth = Number.parseFloat(borderWidth.substr(0, borderWidth.indexOf('px')));
        setRowDimensions({
          width: calendarRef.current.offsetWidth - (borderWidth as number * 2),
          height: element.cells[0].offsetWidth
        });
      }
    }
  };

  const resizeCell: (element: HTMLTableCellElement | null) => void = (element) => {

    if (element) {
      const title: HTMLDivElement | null = element.querySelector(`.${styles["day-head"]}`);
      if (title) {
        const padding = Number.parseFloat(getComputedStyle(title, null).paddingTop.replace(/[a-zA-Z]*/g, ''))
        const border = Number.parseFloat(getComputedStyle(title, null).borderLeft.replace(/[a-zA-Z]*/g, ''));
        const diff: number = element.offsetHeight - title.offsetHeight - (padding * 2 + border * 2);

        console.log(diff)
        setCellDimensions({
          height: diff,
          width: element.offsetWidth - (padding * 2 + border * 2)
        });
      }
    }
  };

  const onResizeRow: (element: HTMLTableRowElement | null) => void = useCallback(resizeRow, [
    setRowDimensions
  ]);
  const onResizeCell: (element: HTMLTableCellElement | null) => void = useCallback(resizeCell, [
    setCellDimensions
  ]);

  useEffect(() => {
    if (onResize) {
      onResize(() => {
        if (rowRef.current) {
          onResizeRow(rowRef.current);
        }
        if (tdRef.current) {
          onResizeCell(tdRef.current);
        }
      });
    }
  }, [onResizeCell, onResizeRow, tdRef, rowRef, onResize]);

  useEffect(() => {
    setInitialized(
      typeof rowDimensions.height !== "undefined" &&
        typeof rowDimensions.width !== "undefined" &&
        typeof cellDimensions.width !== "undefined" &&
        typeof cellDimensions.height !== "undefined"
    );
  }, [cellDimensions, rowDimensions, setInitialized]);

  return (
    <tr
      ref={rowRef}
      className={classnames(styles.row, { [styles.ready]: !initialized })}
      style={{
        width: rowDimensions.width,
        height: rowDimensions.height
      }}
    >
      {dates.map((date, key) => (
        <Day
          key={key}
          cellRef={tdRef}
          events={events.filter((event) => {
            const time: number = startOfDay(event.startDate).getTime();

            return time === date.date.getTime();
          })}
          abbreviated={abbreviated}
          eventClicked={eventClicked}
          date={date}
          selecting={isSelecting}
          selected={
            selectedDates &&
            selectedDates.findIndex((x) => x.getTime() === date.date.getTime()) >= 0
          }
          onMouseDown={onDayMouseDown}
          onMouseUp={onDayMouseUp}
          onMouseOver={onDayMouseOver}
          width={cellDimensions.width}
          height={cellDimensions.height}
          initialized={initialized}
        />
      ))}
    </tr>
  );
}


