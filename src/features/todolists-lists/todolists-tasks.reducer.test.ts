import {
  TodolistDomainType,
  todolistsActions,
  todolistsReducer,
  todolistsThunks,
} from 'features/todolists-lists/todolists/todolists.reducer';
import { tasksReducer, TasksStateType } from 'features/todolists-lists/tasks/tasks.reducer';
import { TodolistType } from 'features/todolists-lists/todolists/todolists.api';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const args = {
    todolist: {
      title: 'new todolist',
      id: 'any id',
      addedDate: '',
      order: 0,
    },
  };
  const action = todolistsThunks.addTodolist.fulfilled(args, 'requestId', {
    title: 'new todolist',
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
