import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatFriendListService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public showFriendsList(value){
    console.log("in chat friend list service ", value);
    return this.http.post('http://localhost:3000/chatfriends', value, {headers: this.headers});
  }
}
