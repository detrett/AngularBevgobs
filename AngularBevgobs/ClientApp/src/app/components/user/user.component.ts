import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service'; // Adjust the path as per your project structure
import { ApplicationUser } from 'src/Models/ApplicationUser';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: ApplicationUser[] = [];
  selectedUser: ApplicationUser | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);
  }

  viewDetails(userId: number): void {
    this.userService.getUserById(userId).subscribe(user => this.selectedUser = user);
  }

  createUser(user: ApplicationUser): void {
    this.userService.createUser(user).subscribe(newUser => {
      this.users.push(newUser);
    });
  }

  updateUser(user: ApplicationUser): void {
    this.userService.updateUser(user).subscribe(updatedUser => {
      // Update logic here
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter(user => user.id !== userId);
    });
  }
}
