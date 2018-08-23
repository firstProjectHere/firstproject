import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRequestService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public confirmUser(friend){
    console.log('request reached to confirm service', friend);
    return this.http.post('http://localhost:3000/confirmuserrequest', friend, {headers:this.headers});
  }
}
