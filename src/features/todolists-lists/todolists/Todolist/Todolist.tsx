import React, { FC, memo, useEffect } from 'react';
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm';
import { TodolistDomainType } from 'features/todolists-lists/todolists/todolists.reducer';
import { Box } from '@mui/material';
import { tasksThunks } from 'features/todolists-lists/tasks/tasks.reducer';
import { TaskType } from '../../tasks/tasks.api';
import { useActions } from 'common/hooks/useActions';
import { FilterTasksButtons } from './FilterTasksButtons';
import { Tasks } from './Tasks/Tasks';
import { TodolistTitle } from './TodolistTitle/TodolistTitle';

type PropsType = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};

export const Todolist: FC<PropsType> = memo(({ todolist, tasks }) => {
    const { fetchTasks, addTask } = useActions(tasksThunks);

    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallback = (title: string) => {
        return addTask({ title, todolistId: todolist.id }).unwrap();
    };

    return (
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <TodolistTitle todolist={todolist} />
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
            <Box padding={'16px 0px'}>
                <Tasks todolist={todolist} tasks={tasks} />
            </Box>
            <FilterTasksButtons todolist={todolist} />
        </Box>
    );
});
