import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { loadTodos, loadTodosFailure, loadTodosSuccess } from './todo.actions';
import { Todo } from './todo.model';

/**
 * Aqui temos nossos effects
 * Os effects lidam com operações assíncronas e side effects
 * escutam Actions para fazer efeitos colaterais (HTTP, navigation)
 * e geralmente disparam novas Actions.
 */
@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions) {}

  loadTodos$ = createEffect(() =>
    /*
  Injeção do Actions, que é um Observable de todas as ações disparadas no store.
   O effect vai aplicar operadores RxJS sobre esse stream.
  */
    this.actions$.pipe(
      /* 
        Operador de filtro do NgRx que permite passar apenas ações do tipo loadTodos. 
        É equivalente a filter(action => action.type === '[Todos] Load Todos') mais tipado.
        */
      ofType(loadTodos),
      /*
        Quando a ação loadTodos chega, switchMap executa a função que retorna um novo Observable
        (a chamada à API).
        Importante: switchMap cancela o observable
        anterior se uma nova ação loadTodos for disparada antes do anterior terminar.
        Alternativas:
           mergeMap: permite concorrência (não cancela anteriores).
           concatMap: enfileira as requisições (executa uma por vez, na ordem).
           exhaustMap: ignora novas ações enquanto a anterior não terminar (bom para evitar múltiplos envios).
       */
      switchMap(() => {
        // Simulando chamada à API
        const mockTodos: Todo[] = [
          { id: 1, title: 'Estudar NgRx', completed: false },
          { id: 2, title: 'Fazer exercícios', completed: true },
        ];

        return of(mockTodos).pipe(
          delay(1000), // simula tempo de resposta
          map((todos) => loadTodosSuccess({ todos })),
          catchError((err) => of(loadTodosFailure({ error: err.message })))
        );
      })
    )
  );
}
