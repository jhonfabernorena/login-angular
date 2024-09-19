import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];
  selecteduser: User | null = null;
  newuser: User = { id: 0, first_name: '', last_name: '', email: '' };
  showcreateform: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  viewCreateForm() {
    this.showcreateform = !this.showcreateform;
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      }
    });
  }

  createUser() {
    this.userService.createUser(this.newuser).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser);  

        this.newuser = { id: 0, first_name: '', last_name: '', email: '' };  
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
      }
    });
  }

  editUser(user: User) {
    this.selecteduser = { ...user };
  }

  updateUser() {
    if (this.selecteduser) {
      this.userService.updateUser(this.selecteduser).subscribe({
        next: (updatedUser) => {
          this.users = this.users.map(user => user.id === updatedUser.id ? updatedUser : user);
          this.selecteduser = null;  
        },
        error: (error) => {
          console.error('Error al actualizar el usuario', error);
        }
      });
    }
  }

  deleteUser(id: number) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmed) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      });
    }
  } 
}
