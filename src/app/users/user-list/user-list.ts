import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private userService = inject(UserService);

  users = this.userService.users;
  // usersState = this.userService.usersState;
  usersState = this.userService.usersC
  loadingState = this.userService.loadingC
  errorState = this.userService.errorC
  
  
  ngOnInit() {
    console.log('%c⧭', 'color: #00e600', this.usersState());
    // this.userService.getUsers().subscribe();
  }
}
