import React, { FC, memo } from 'react';
import { TaskStatuses } from 'common/enums';
import { Task } from './Task/Task';
import { TodolistDomainType } from 'features/todolists-lists/todolists/todolists.reducer';
import { TaskType } from 'features/todolists-lists/tasks/tasks.api';

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks: FC<PropsType> = memo(({ todolist, tasks }) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task key={t.id} task={t} todolistId={todolist.id} />
      ))}
    </>
  );
});
