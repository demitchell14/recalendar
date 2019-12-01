import * as React from "react";
import ReactDOM from "react-dom";

import { ReCalendar } from "../src";

class CalendarExample extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <ReCalendar />
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<CalendarExample />, root);
});
