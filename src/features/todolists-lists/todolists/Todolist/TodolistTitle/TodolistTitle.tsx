import React, { FC, memo } from 'react';
import { EditableSpan } from 'common/components';
import { IconButton, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TodolistDomainType, todolistsThunks } from '../../todolists.reducer';
import { useActions } from 'common/hooks/useActions';

type PropsType = {
    todolist: TodolistDomainType;
};

export const TodolistTitle: FC<PropsType> = memo(({ todolist }) => {
    const { removeTodolist, changeTodolistTitle } = useActions(todolistsThunks);

    const removeTodolistCallback = () => {
        removeTodolist({ todolistId: todolist.id });
    };

    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle({ todolistId: todolist.id, title });
    };

    return (
        <Typography variant='h3' align='center' sx={{ fontSize: '24px', fontWeight: 'bold', p: 2 }}>
            <EditableSpan value={todolist.title} onChange={changeTodolistTitleCallback} />
            <IconButton onClick={removeTodolistCallback} disabled={todolist.entityStatus === 'loading'}>
                <Delete />
            </IconButton>
        </Typography>
    );
});
