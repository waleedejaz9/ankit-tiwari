import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarTable from './CalendarTable';

const Calendar = ({toggleHabitRecord, task}) => {

    const data = [
        {
            date:'01-29-2023',
            status:'missing'
        },
        {
            date:'01-21-2023',
            status:'missing'
        },
        {
            date:'02-20-2023',
            status:'done'
        },
        {
            date:'02-21-2023',
            status:'missing'
        },
        {
            date:'02-22-2023',
            status:'missing'
        },
        {
            date:'02-23-2023',
            status:'done'
        },
        {
            date:'02-24-2023',
            status:'coming'
        },
        {
            date:'02-25-2023',
            status:'coming'
        }
    ]
    // ** State
    const [ monthDate, setMonthDate ] = useState(new Date())

    return (
        <>
            <CalendarHeader monthDate={monthDate} setMonthDate={setMonthDate} />
            <CalendarTable year={monthDate.getFullYear()} month={monthDate.getMonth()} data={data} toggleHabitRecord={toggleHabitRecord} task={task}/>
        </>
    )
}

export default Calendar;