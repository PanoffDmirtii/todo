import {Injectable} from '@angular/core';
import {TodoItem} from '../models/todo-item';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todoList: Observable<TodoItem[]>;

  constructor(
    private https: HttpClient,
    private firestore: AngularFirestore,
  ) {
    this.todoList = this.firestore.collection<TodoItem>('todo').snapshotChanges().pipe(
      map(actions => {
        return actions.map( e => {
          return {id: e.payload.doc.id, ...e.payload.doc.data()};
        });
      }));
  }

  addItemTodo(item) {
    this.firestore.collection('todo').add(item);
  }

  deleteItemTodo(item) {
    this.firestore.doc('todo/' + item.id).delete();
  }

  updateItemTodo(item) {
    const id = item.id;
    delete item.id;
    this.firestore.doc('todo/' + id).update(item);

  }
}
