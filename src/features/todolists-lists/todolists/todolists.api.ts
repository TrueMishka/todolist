import { instance } from 'common/api/common.api';
import { ResponseType } from 'common/types/common.types';

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },
    createTodolist(arg: CreateTodolistArgType) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title: arg.title });
    },
    deleteTodolist(arg: RemoveTodolistArgType) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}`);
    },
    updateTodolist(arg: UpdateTodolistArgType) {
        return instance.put<ResponseType>(`todo-lists/${arg.todolistId}`, { title: arg.title });
    },
};

export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type RemoveTodolistArgType = {
    todolistId: string;
};
export type CreateTodolistArgType = {
    title: string;
};
export type UpdateTodolistArgType = {
    todolistId: string;
    title: string;
};
