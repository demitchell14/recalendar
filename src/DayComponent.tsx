import * as React from "react";
import { SyntheticEvent } from "react";
import classnames from "classnames";

import Event from "./EventComponent";
import styles from "./styles/calendar.module.scss";
import { DayProps, CalendarEvent } from "./interfaces";

export default function DayComponent(props: DayProps): JSX.Element {
  const { date, height, width, cellRef, initialized, selected, abbreviated } = props;

  const onMouseDown: (evt: SyntheticEvent) => any = (evt) => {
    evt.preventDefault();
    if (props.onMouseDown) {
      props.onMouseDown(props.date.date);
    }
  };

  const onMouseUp: (evt: SyntheticEvent) => any = (evt) => {
    evt.preventDefault();
    if (props.selecting) {
      if (props.onMouseUp) {
        props.onMouseUp(props.date.date);
      }
    }
  };

  const onMouseOver: (evt: SyntheticEvent) => any = (evt) => {
    evt.preventDefault();
    if (props.selecting) {
      if (props.onMouseOver) {
        props.onMouseOver(props.date.date);
      }
    }
  };

  const onEventClicked: (event: CalendarEvent) => any = (event) => {
    if (props.eventClicked) {
      props.eventClicked({ ...props.date, event });
    }
  };

  return (
    <td
      ref={cellRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseOver={onMouseOver}
      className={classnames(
        styles.column,
        { [styles["this-month"]]: date.thisMonth },
        { [styles.today]: date.today },
        { [styles.selected]: selected },
          { [styles['day-abbr']]: abbreviated }
      )}
    >
      <div className={classnames(
          styles["day-head"],
          // {[styles["day-head-abbr"]]: abbreviated}
      )}>
        <span className={styles["date-number"]}>{date.date.getDate()}</span>
      </div>
      <div
        style={{
          width,
          height
        }}
        className={styles.events}
      >
        {initialized && (
          <React.Fragment>
            {props.events.map((evt, key) => (
              <Event key={key} onClick={onEventClicked} {...evt} />
            ))}
            {/*<Event />*/}
            {/*<Event />*/}
            {/*<Event />*/}
            {/*<Event />*/}
            {/*<Event />*/}
            {/*<Event />*/}
          </React.Fragment>
        )}
      </div>
    </td>
  );
}
