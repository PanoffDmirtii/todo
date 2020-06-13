import {Component, Input, Output} from '@angular/core';
import {TodoItem} from '../../models/todo-item';
import {ToastrService} from 'ngx-toastr';
import {ModalComponent} from '../../shared/modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {TodoService} from '../../services/todo.service';

@Component({
  selector: 'app-item-todo',
  templateUrl: './item-todo.component.html',
  styleUrls: ['./item-todo.component.css']
})
export class ItemTodoComponent {
  @Input() todoItem;
  isEdit = false;

  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog,
    private todoService: TodoService) {
  }

  toggleEdit() {
    this.isEdit = !this.isEdit;
  }

  saveTitle(event) {
    const newTitle = event.target.value;
    if (!newTitle) {
      this.toastr.warning('Title should not be empty');
    } else if (newTitle !== this.todoItem.title) {
      this.todoItem.title = newTitle;
      this.todoService.updateItemTodo(this.todoItem);
      this.toastr.success('Task title was edit');
    } else {
      this.toastr.info('No change');
    }
    this.isEdit = false;
  }

  toggleComplete(event) {
    this.todoItem.completed = event.checked;
    console.log(this.todoItem);
    this.todoService.updateItemTodo(this.todoItem);
    this.toastr.success(`Task ${event.checked ? 'is completed' : 'at work'}`);
  }

  deleteItem() {
    const dialogRef = this.dialog.open(ModalComponent, {data: this.todoItem});
    dialogRef.afterClosed().subscribe(
      res => this.todoService.deleteItemTodo(res)
    );
  }
}
