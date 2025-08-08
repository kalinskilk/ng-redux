import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

/**
 * Aqui temos as actions de nosso redux
 * as actions descrevem eventos que modificam o estado.
 * Por exemplo, carregamento de dados, adição, edição deleção.
 */

// Carregar todos
export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: string }>()
);

// Adicionar todo
export const addTodo = createAction(
  '[Todo] Add Todo',
  props<{ title: string }>()
);
