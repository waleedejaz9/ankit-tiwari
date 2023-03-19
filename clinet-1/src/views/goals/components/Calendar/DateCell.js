import React, { useMemo, useState } from 'react';
import classNames from 'classnames';

const DateCell = ({ date, status, isCurrentMonth,toggleHabitRecord,task }) => {
  const relation = {
    background: {
      done: '#03C22D',
      missing: '#CF0505',
      coming: 'none',
      prevDone: '#8beea1',
      prevMissed: '#f47676'
    },
    text: {
      coming: 'black',
      done: 'white',
      missing: 'white'
    }
  };

  return (
    <>
      <div
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{
          background: isCurrentMonth
            ? relation.background[status]
            : status === 'missing'
            ? relation.background['prevMissed']
            : status === 'done'
            ? relation.background['prevDone']
            : 'none',
          width: '48px',
          height: '48px',
          cursor:"pointer",
          color: status === 'coming' && !isCurrentMonth ? '#b9b9c3' : relation.text[status]
        }}
        onClick={()=>toggleHabitRecord(task)}
      >
        <p className='my-0 py-0'>{date}</p>
      </div>
    </>
  );
};

export default DateCell;
