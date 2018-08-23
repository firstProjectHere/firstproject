import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowPendingRequestService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public showPendingRequest(user){
    console.log("request has reached to service ", user);
    return this.http.post('http://localhost:3000/showpendingrequest', user, {headers:this.headers})
  }
}
