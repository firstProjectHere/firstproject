import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RealChatService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor( private http: HttpClient) { }

  public textMessage(value){
    console.log("store message reached service ", value);
    return this.http.post('http://localhost:3000/storeMessage', value, {headers: this.headers});
  }

 
}
