import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TodoStateS } from './todo.reducer';

export const selectTodoState = createFeatureSelector<TodoStateS>('todos'); // crée la clé dans le store

export const selectAllTodos = createSelector(selectTodoState, (state) => state.todos);
