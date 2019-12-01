import * as React from "react";

import { months } from "./constants";
import { DayAndMonthArray, TitleProps } from "./interfaces";

import headerStyles from "./styles/header.module.scss";

import leftIco from "./icons/chevron-left.svg";
import rightIco from "./icons/chevron-right.svg";

export default function TitleComponent(props: TitleProps): JSX.Element {
  const { date, onChange } = props;

  function getMonth(num: number): DayAndMonthArray {
    if (num >= months.length) {
      num -= months.length;
    }
    if (num < 0) {
      num = 0;
    }

    if (months[num]) {
      return months[num];
    } else {
      return {
        full: "N/A",
        abbr: "N/A"
      };
    }
  }

  const onClick: (num: number) => any = (num: number) => () => {
    if (onChange) {
      onChange(num);
    }
  };

  return date ? (
    <div className={headerStyles.title}>
      <button
        onClick={onClick(date.getMonth() - 1)}
        className={headerStyles.page}
        title={`View ${getMonth(date.getMonth() - 1).full}`}
      >
        <img
          alt={`View ${getMonth(date.getMonth() - 1).full}`}
          src={leftIco}
          width={30}
          height={30}
        />
      </button>
      <div className={headerStyles.body}>
        <h3>
          {getMonth(date.getMonth()).full} {date.getFullYear()}
        </h3>
        <div>
          <button>Test</button>
          <button>buttons</button>
        </div>
      </div>
      <button
        onClick={onClick(date.getMonth() + 1)}
        className={headerStyles.page}
        title={`View ${getMonth(date.getMonth() + 1).full}`}
      >
        <img
          alt={`View ${getMonth(date.getMonth() + 1).full}`}
          src={rightIco}
          width={30}
          height={30}
        />
      </button>
    </div>
  ) : (
    <div />
  );
}
