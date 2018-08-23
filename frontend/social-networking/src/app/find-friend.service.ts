import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindFriendService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public findfriend(value){
    console.log("request reached in the service", value);
    return this.http.post('http://localhost:3000/findfriend', value, {headers:this.headers})
  }
}
