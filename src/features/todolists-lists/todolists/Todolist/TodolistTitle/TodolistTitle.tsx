import React, { FC, memo } from 'react';
import { EditableSpan } from 'common/components';
import { Typography } from '@mui/material';
import { useActions } from 'common/hooks/useActions';
import {
  TodolistDomainType,
  todolistsThunks,
} from 'features/todolists-lists/todolists/todolists.reducer';

type PropsType = {
  todolist: TodolistDomainType;
};

export const TodolistTitle: FC<PropsType> = memo(({ todolist }) => {
  const { changeTodolistTitle } = useActions(todolistsThunks);

  const changeTodolistTitleCallback = (title: string) => {
    changeTodolistTitle({ todolistId: todolist.id, title });
  };

  return (
    <Typography
      variant='h3'
      align='center'
      sx={{ fontSize: '24px', fontWeight: 'bold', p: 2, wordWrap: 'break-word', width: '300px' }}
    >
      <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
    </Typography>
  );
});
