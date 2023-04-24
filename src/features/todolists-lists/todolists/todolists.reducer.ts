import { RequestStatusType } from 'app/app.reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearTasksAndTodolists } from 'common/actions/common.actions';
import {
  CreateTodolistArgType,
  RemoveTodolistArgType,
  todolistsApi,
  TodolistType,
  UpdateTodolistArgType,
} from 'features/todolists-lists/todolists/todolists.api';
import { createAppAsyncThunk } from 'common/utils';
import { ResultCode } from 'common/enums';

const initialState: TodolistDomainType[] = [];

// thunks
const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }>(
  'todo/fetchTodolists',
  async () => {
    const res = await todolistsApi.getTodolists();
    return { todolists: res.data };
  }
);

const removeTodolist = createAppAsyncThunk<RemoveTodolistArgType, RemoveTodolistArgType>(
  'todo/removeTodolists',
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.deleteTodolist(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }
  }
);

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, CreateTodolistArgType>(
  'todo/addTodolist',
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.createTodolist(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: false });
    }
  }
);

const changeTodolistTitle = createAppAsyncThunk<UpdateTodolistArgType, UpdateTodolistArgType>(
  'todo/updateTodolist',
  async (arg, { rejectWithValue }) => {
    const res = await todolistsApi.updateTodolist(arg);
    if (res.data.resultCode === ResultCode.Success) {
      return arg;
    } else {
      return rejectWithValue({ data: res.data, showGlobalError: true });
    }
  }
);

const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    changeTodolistFilter: (
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>
    ) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: 'all',
          entityStatus: 'idle',
        }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: 'all',
          entityStatus: 'idle',
        };
        state.unshift(newTodolist);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.todolistId);
        if (todo) {
          todo.title = action.payload.title;
        }
      })
      .addCase(clearTasksAndTodolists, () => {
        return [];
      });
  },
});

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {
  fetchTodolists,
  removeTodolist,
  addTodolist,
  changeTodolistTitle,
};

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
