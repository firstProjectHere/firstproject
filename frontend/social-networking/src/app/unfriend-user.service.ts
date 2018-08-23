import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UnfriendUserService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor( private http: HttpClient ) { }

  public unfriendUser(user){
    console.log("made it inside unfriend service", user);
    return this.http.post('http://localhost:3000/unfriendUser', user, {headers:this.headers});
  }
}
