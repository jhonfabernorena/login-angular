import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }


  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=1`);
  }


  createUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }


  updateUser(user: any): Observable<any> {
    // console.log("Esta funcionando")
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
