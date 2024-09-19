import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('https://reqres.in/api/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response: any) => {

        
        localStorage.setItem('token', response.token);
        this.router.navigate(['/users']);
      },
      error: () => {
        this.errorMessage = ' Email o contraseña incorrectos';
      }
    });
  }
}
