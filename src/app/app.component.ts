import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodoFacade } from './facade/todo.facade';
import { Todo } from './state/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;
  newTodo = '';

  constructor(private todoFacade: TodoFacade) {
    this.todos$ = this.todoFacade.todos$;
    this.loading$ = this.todoFacade.loading$;
  }

  /**
   * dispara a action de carregar todas as tarefas => loadTodos()
   */
  onLoadTodos() {
    this.todoFacade.loadTodos();
  }

  /**
   * dispara a action de adicionar uma tarefa => addTodo
   */
  onAddTodo() {
    if (this.newTodo.trim()) {
      this.todoFacade.addTodo(this.newTodo);
      this.newTodo = '';
    }
  }
}
