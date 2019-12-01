import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import Headers from "./HeadersComponent";
import Title from "./TitleComponent";
import Row from "./RowComponent";

import { addDays, getToday, startOfDay } from "./constants";
import styles from "./styles/calendar.module.scss";
import {CalendarProps, DateObject, StateObject, CalendarEvent} from "./interfaces";

export default function CalendarComponent(props: CalendarProps): JSX.Element {
  const [useAbbreviation, setUseAbbreviation] = useState(
    props.forceAbbreviation || false
  ) as StateObject<boolean>;
  const [resizeFunctions, setResizeFunctions] = useState([]) as StateObject<any>;
  const [dateMap, setDateMap] = useState([]) as StateObject<DateObject[][] | any>;
  const [activeDate, setActiveDate] = useState(undefined) as StateObject<Date | undefined>;
  const [selectedDates, setSelectedDates] = useState() as StateObject<Date[]>;
  const [isSelecting, setIsSelecting] = useState(false);

  const assignFunction: (key: number, fn: Function) => any = useCallback(
    (key: number, fn: Function) => {
      resizeFunctions[key] = fn;
      setResizeFunctions(resizeFunctions);
      fn();
    },
    [setResizeFunctions, resizeFunctions]
  ) as (key: number, fn: Function) => any;

  useEffect(() => {
    const fn: (evt: Event) => void = () => {
      if (isSelecting) {
        setIsSelecting(false);
      } else {
        setSelectedDates([]);
      }
    };
    document.addEventListener("mouseup", fn);

    return () => {
      document.removeEventListener("mouseup", fn);
    };
  }, [isSelecting, setIsSelecting, setSelectedDates]);

  useEffect(() => {
    const start: Date = ((start: any): Date => {
      if (start instanceof Array) {
        start = new Date(...(start as []));
      } else if (typeof start === "object") {
        // no op
      } else if (typeof start === "string") {
        start = new Date(start);
      } else {
        start = new Date();
      }

      return start;
    })(props.startDate);

    setActiveDate(start);
  }, [props.startDate, setActiveDate]);

  useEffect(() => {
    if (activeDate) {
      setDateMap(generateDateMap(activeDate.getFullYear(), activeDate.getMonth()));
    }
  }, [activeDate, setDateMap]);

  useEffect(() => {
    let timeout: any;
    const onResize: (evt?: Event) => void = (evt?) => {
      clearTimeout(timeout);
      setTimeout(() => {
        if (evt) {
          const currentTarget: Window | any = evt.currentTarget;
          if (!props.forceAbbreviation) {
            setUseAbbreviation(currentTarget.innerWidth < 600);
          }
        }
        Object.keys(resizeFunctions).map((k) => {
          if (typeof resizeFunctions[k] === "function") {
            resizeFunctions[k]();
          }

          return null;
        });
      }, 100);
    };

    window.addEventListener("resize", onResize);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [props.forceAbbreviation, resizeFunctions, setUseAbbreviation]);

  const onChangeMonth: (month: number) => void = (month) => {
    if (activeDate) {
      let year: number = activeDate.getFullYear();
      if (month > 11) {
        month = 0;
        year += 1;
      }
      if (month < 0) {
        month = 11;
        year -= 1;
      }
      setDateMap(generateDateMap(year, month));
      setActiveDate(new Date(year, month, 1));
    }
  };

  const onDayMouseDown: (date: Date) => void = (date) => {
    setSelectedDates([date]);
    setIsSelecting(true);
  };

  const onDayMouseUp: (date: Date) => void = (date) => {
    const x: number = selectedDates.map((d) => d.getTime()).findIndex((d) => d === date.getTime());
    if (x === -1) {
      setSelectedDates([...selectedDates, date]);
    }
    setIsSelecting(false);

    if (props.onSelected) {
      const filtered: Array<DateObject & { events: CalendarEvent }> = dateMap
        .flat(1)
        .filter(
          (date: DateObject) =>
            selectedDates.map((d) => d.getTime()).findIndex((d) => d === date.date.getTime()) >= 0
        )
        .map((date: DateObject) => {
          const events: CalendarEvent[] = props.events
            ? props.events
                .map((event) => ({
                  ...event,
                  startDate: new Date(event.startDate.valueOf()),
                  endDate: event.endDate ? new Date(event.endDate.valueOf()) : undefined
                }))
                .filter((event) => {
                  const time: number = startOfDay(event.startDate).getTime();

                  return date.date.getTime() === time;
                })
            : [];

          return { ...date, events };
        });

      props.onSelected(filtered);
    }
  };

  const onDayMouseOver: (date: Date) => void = (date) => {
    const x: number = selectedDates.map((d) => d.getTime()).findIndex((d) => d === date.getTime());
    if (x === -1) {
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div className={styles.recalendar}>
      <Title onChange={onChangeMonth} date={activeDate} />

      <table className={styles.table}>
        <thead>
          <Headers abbreviate={useAbbreviation} />
        </thead>
        <tbody>
          {dateMap.map((map: DateObject[], key: number) => {
            return (
              <Row
                key={key}
                dates={map}
                events={
                  props.events
                    ? props.events
                        .map((event) => ({
                          ...event,
                          startDate: new Date(event.startDate.valueOf()),
                          endDate: event.endDate ? new Date(event.endDate.valueOf()) : undefined
                        }))
                        .filter((event) => {
                          const time: number = startOfDay(event.startDate).getTime();

                          return map.map((d) => d.date.getTime()).findIndex((d) => d === time) >= 0;
                        })
                    : []
                }
                eventClicked={props.eventClicked}
                isSelecting={isSelecting}
                selectedDates={selectedDates}
                onDayMouseDown={onDayMouseDown}
                onDayMouseUp={onDayMouseUp}
                onDayMouseOver={onDayMouseOver}
                onResize={(fn: Function) => {
                  assignFunction(key, fn);
                  // return fn
                }}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function generateDateMap(year: number, month: number): DateObject[][] {
  const today: Date = getToday();

  const date: Date = new Date(year, month, 1, 0, 0, 0, 0);
  const rows: DateObject[][] = [];
  let days: DateObject[] = [];
  let current: Date = new Date(date.valueOf());
  let currentDay: number = current.getDay();

  const tmp: number = setTimeout(() => {
    date.setMonth(0);
  }, 2000);

  while (current.getMonth() === date.getMonth()) {
    if (currentDay !== 0) {
      let leading: number = currentDay;
      for (let i: number = 0; i < currentDay; i++) {
        const tmp: Date = addDays(current, -leading--);
        days.push({
          date: tmp,
          thisMonth: false,
          today: tmp.getTime() === today.getTime()
        });
      }
    }

    for (let i: number = currentDay; i < 7; i++) {
      days.push({
        date: current,
        thisMonth: current.getMonth() === date.getMonth(),
        today: current.getTime() === today.getTime()
      });
      current = addDays(current, 1);
    }

    rows.push(days);
    currentDay = current.getDay();
    days = [];
  }

  clearTimeout(tmp);

  return rows;
}
