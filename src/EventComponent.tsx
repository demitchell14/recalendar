import * as React from "react";
import { SyntheticEvent } from "react";

import { EventProps } from "./interfaces";
import styles from "./styles/calendar.module.scss";

export default function EventComponent(props: EventProps): JSX.Element {
  const sendPrevent: (evt: SyntheticEvent) => any = (evt) => {
    evt.stopPropagation();
  };

  const onClick: (evt: SyntheticEvent) => any = () => {
    if (props.onClick) {
      props.onClick(props);
    }
  };

  return (
    <div onClick={onClick} onMouseDown={sendPrevent} className={styles.event}>
      {props.title}
    </div>
  );
}
