import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {FilterValuesType, todolistsActions, todolistsThunks} from 'features/TodolistsList/todolists.reducer'
import {tasksThunks} from 'features/TodolistsList/tasks.reducer'
import {Box, Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {Todolist} from './Todolist/Todolist'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTasks} from 'features/TodolistsList/tasks.selectors';
import {selectTodolists} from 'features/TodolistsList/todolists.selectors';
import {TaskStatuses} from 'common/enums';
import {useActions} from "../../common/hooks/useActions";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {
        fetchTodolists,
        removeTodolist: removeTodolistThunk,
        addTodolist: addTodolistThunk,
        changeTodolistTitle: changeTodolistTitleThunk
    } = useActions(todolistsThunks)

    const {
        addTask: addTaskThunk,
        updateTask: updateTaskThunk,
        removeTask: removeTaskThunk
    } = useActions(tasksThunks)

    const {changeTodolistFilter} = useActions(todolistsActions)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        fetchTodolists()
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        removeTaskThunk({taskId, todolistId})
    }, [])

    const addTask = useCallback(function (title: string, todolistId: string) {
        addTaskThunk({title, todolistId})
    }, [])

    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTaskThunk({taskId, domainModel: {status}, todolistId})
    }, [])

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        updateTaskThunk({taskId, domainModel: {title}, todolistId})
    }, [])

    const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
        changeTodolistFilter({id, filter})
    }, [])

    const removeTodolist = useCallback(function (id: string) {
        removeTodolistThunk({todolistId: id})
    }, [])

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        changeTodolistTitleThunk({todolistId: id, title})
    }, [])

    const addTodolist = useCallback((title: string) => {
        addTodolistThunk({title})
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <Box sx={{paddingBottom: '50px'}}>
        <Grid container style={{padding: '30px'}} justifyContent={'center'}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3} justifyContent="center">
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px', maxWidth: '350px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </Box>
}
