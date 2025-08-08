import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodo, loadTodos } from '../state/todo.actions';
import { selectAllTodos, selectLoading } from '../state/todo.selectors';

@Injectable({ providedIn: 'root' })
export class TodoFacade {
  todos$ = this.store.select(selectAllTodos);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store) {}

  loadTodos() {
    this.store.dispatch(loadTodos());
  }
  addTodo(title: string) {
    this.store.dispatch(addTodo({ title }));
  }
}
