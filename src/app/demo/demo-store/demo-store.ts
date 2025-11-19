import { Component, inject } from '@angular/core';
import { selectAllTodos } from '../../ngrx/todo.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addTodo } from '../../ngrx/todo.actions';
@Component({
  selector: 'app-demo-store',
  imports: [CommonModule, FormsModule],
  templateUrl: './demo-store.html',
  styleUrl: './demo-store.css',
})
export class DemoStore {
  store = inject(Store);
  newTodoTitle = '';

  allTodos$ = this.store.select(selectAllTodos);

  onAddTodo() {
    if (this.newTodoTitle.trim()) {
      this.store.dispatch(addTodo(this.newTodoTitle));
    }
  }
}
