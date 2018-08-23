import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import 'rxjs/RX';
// import { observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchingImageService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public displayImg(value){
    console.log("image request in service", value);
    return this.http.post('http://localhost:3000/file/dp', value, {headers:this.headers});
  }
}
