import React, { FC, memo, useEffect } from 'react';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import {
  TodolistDomainType,
  todolistsThunks,
} from 'features/todolists-lists/todolists/todolists.reducer';
import { Box, IconButton, Paper } from '@mui/material';
import { tasksThunks } from 'features/todolists-lists/tasks/tasks.reducer';
import { useActions } from 'common/hooks/useActions';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';
import { TaskType } from 'features/todolists-lists/tasks/tasks.api';
import ClearIcon from '@mui/icons-material/Clear';

type PropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist: FC<PropsType> = memo(({ todolist, tasks }) => {
  const { fetchTasks, addTask } = useActions(tasksThunks);
  const { removeTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTasks(todolist.id);
  }, []);

  const addTaskCallback = (title: string) => {
    return addTask({ title, todolistId: todolist.id }).unwrap();
  };

  const removeTodolistCallback = () => {
    removeTodolist({ todolistId: todolist.id });
  };

  return (
    <Paper style={{ padding: '10px', width: '350px', position: 'relative' }}>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <IconButton
          onClick={removeTodolistCallback}
          disabled={todolist.entityStatus === 'loading'}
          style={{ position: 'absolute', top: '1px', right: '1px' }}
        >
          <ClearIcon />
        </IconButton>
        <TodolistTitle todolist={todolist} />
        <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
        <Box
          padding={'16px 10px'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            width: '100%',
          }}
        >
          <Tasks todolist={todolist} tasks={tasks} />
        </Box>
        <FilterTasksButtons todolist={todolist} />
      </Box>
    </Paper>
  );
});
