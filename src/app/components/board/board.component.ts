import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../services/todo.service';
import {AuthService} from '../../services/auth.service';
import {VkApiService} from '../../services/vk-api.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  newTodoTitle: string;
  userID: number;
  userData: any;

  constructor(
    public todoService: TodoService,
    private authService: AuthService,
    private vkApi: VkApiService
  ) {
  }

  ngOnInit(): void {
    this.userID = this.authService.userID;
    this.vkApi.getVkUser(this.userID).subscribe(
      res => {
        this.userData = res.response[0];
      }
    );
  }

  addItem() {
    this.todoService.addItemTodo({
      title: this.newTodoTitle,
      completed: false
    });
  }
}
