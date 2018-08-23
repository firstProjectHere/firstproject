import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirstRegisterService {

  constructor(private http: HttpClient) { }

  registerUser(user){
    this.http.post('http://localhost:3000/register', user).subscribe(res => {
      console.log("inside register service and user registered");
    })
  }
}
