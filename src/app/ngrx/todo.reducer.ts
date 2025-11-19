import { createReducer, on } from '@ngrx/store';
import { addTodo, TodoS, toggleTodo } from './todo.actions';

export interface TodoStateS {
  todos: TodoS[];
  nextId: number;
}

export const initialState: TodoStateS = {
  todos: [],
  nextId: 1,
};

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, { title }) => ({
    ...state,
    todos: [...state.todos, { id: state.nextId, title, completed: false }],
    nextId: state.nextId + 1,
  })),
  on(toggleTodo, (state, { id }) => ({
    ...state,
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ),
  }))
);
