import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostUploadService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public postUpload(value){
    console.log("in service post", value);
    return this.http.post('http://localhost:3000/postUpload', value , {headers:this.headers});
  }

}
