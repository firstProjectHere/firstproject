import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginService {

  constructor(private http: HttpClient) { }
 
  public loginUser(user){
    return this.http.post('http://localhost:3000/login', user);
  }
}
