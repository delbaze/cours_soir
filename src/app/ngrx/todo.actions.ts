import { createAction, props } from '@ngrx/store';

export interface TodoS {
  id: number;
  title: string;
  completed: boolean;
}

// Actions

export const addTodo = createAction('[Todo] Add Todo', (title: string) => ({ title }));
export const toggleTodo = createAction('[Todo] Toggle Todo', (id: number) => ({ id }));
// export const addTodo = createAction('[Todo] Add Todo', props<{ title: string }>)();
// export const toggleTodo = createAction('[Todo] Toggle Todo', props<{ id: number }>)();
