import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { todolistsThunks } from 'features/todolists-lists/todolists/todolists.reducer';
import { Box, Grid, Paper } from '@mui/material';
import { AddItemForm } from 'common/components';
import { Todolist } from './todolists/Todolist/Todolist';
import { Navigate } from 'react-router-dom';
import { selectIsLoggedIn } from 'features/auth/auth.selectors';
import { selectTasks } from 'features/todolists-lists/tasks/tasks.selectors';
import { selectTodolists } from 'features/todolists-lists/todolists/todolists.selectors';
import { useActions } from 'common/hooks';

export const TodolistsList = () => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const { fetchTodolists, addTodolist } = useActions(todolistsThunks);

  useEffect(() => {
    fetchTodolists({});
  }, []);

  const addTodolistCallback = useCallback((title: string) => {
    return addTodolist({ title }).unwrap();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <Box sx={{ paddingBottom: '50px' }}>
      <Grid container style={{ padding: '30px' }} justifyContent={'center'}>
        <AddItemForm addItem={addTodolistCallback} label={'Add new todo'} />
      </Grid>
      <Grid container spacing={3} justifyContent='center' alignItems={'flex-start'}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Todolist todolist={tl} tasks={allTodolistTasks} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
