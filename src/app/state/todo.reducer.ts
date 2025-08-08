import { createReducer, on } from '@ngrx/store';
import {
  addTodo,
  loadTodos,
  loadTodosFailure,
  loadTodosSuccess,
} from './todo.actions';
import { Todo } from './todo.model';

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

/**
 * Aqui temos nossos reducers
 * Os reducers modificam o estado de acordo com as actions
 */
export const todoReducer = createReducer(
  initialState,
  on(loadTodos, (state) => ({ ...state, loading: true, error: null })),
  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    loading: false,
    todos,
  })),
  on(loadTodosFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(addTodo, (state, { title }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now(), title, completed: false }],
  }))
);
