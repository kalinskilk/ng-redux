import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';

/**
 * Aqui temos nossos selectors
 * Os selectors extraem partes do estado de forma reativa.
 */
export const selectTodoState = createFeatureSelector<TodoState>('todos');

export const selectAllTodos = createSelector(
  selectTodoState,
  (state) => state.todos
);
export const selectLoading = createSelector(
  selectTodoState,
  (state) => state.loading
);
export const selectError = createSelector(
  selectTodoState,
  (state) => state.error
);
