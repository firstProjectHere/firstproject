import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostShowService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public showPost(value){
    console.log("in service showppost", value);
    return this.http.post('http://localhost:3000/showpost', value, {headers:this.headers})
  }
}
