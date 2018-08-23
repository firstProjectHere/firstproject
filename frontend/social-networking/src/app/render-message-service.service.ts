import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RenderMessageServiceService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }


  public chatWithUser(value){
    console.log("fetching messages service ", value);
    return this.http.post('http://localhost:3000/renderMsg', value, {headers: this.headers});
  }
}
