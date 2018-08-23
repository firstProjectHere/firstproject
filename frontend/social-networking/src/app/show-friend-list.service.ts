import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowFriendListService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public showFriendList(value){
    console.log("show friends list in service", value);
    return this.http.post('http://localhost:3000/friendlist', value, {headers: this.headers});
  }
}
