import * as React from "react";
import ReactDOM from "react-dom";

import { ReCalendar } from "../src";

class CalendarExample extends React.PureComponent<any> {

    render() {
        return (
            <div>
                <ReCalendar
                    events={[
                        { startDate: '2020-01-12', title: 'Test Event', endDate: '2020-01-15' },
                        { startDate: '2020-02-12', title: 'Test Event', endDate: '2020-02-15' },
                        { startDate: '2020-01-12', title: 'Test Event'},
                        { startDate: '2020-01-12', title: 'Test Event'},
                    ]}
                />
            </div>
            // <div style={{
            //     display: 'flex',
            // }}>
            //     <div style={{
            //         width: '45%'
            //     }}>
            //         <ReCalendar />
            //     </div>
            //
            //     <div style={{
            //         width: '45%',
            //         marginLeft: 'auto'
            //     }}>
            //         <ReCalendar />
            //     </div>
            // </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    ReactDOM.render(<CalendarExample />, root);
});
