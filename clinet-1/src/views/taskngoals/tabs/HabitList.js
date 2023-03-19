import React from 'react';

import TasksList from '../../goals/habit-list';

const HabitList = (props) => {
  const {store} = props;
  return (
    <div className="task-application">
      <TasksList store={store} />
    </div>
  );
};

export default HabitList;
