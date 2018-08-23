import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchuserService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }
  
  public searchfriend(value){
    return this.http.post('http://localhost:3000/finduser', value, {headers:this.headers});
  }
}
