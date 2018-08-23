import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeclineRequestService {
  
  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor(private http: HttpClient) { }

  public declineUser(nofriend){
    console.log('request reached to decline service', nofriend);
    return this.http.post('http://localhost:3000/decline', nofriend, {headers:this.headers});
  }
}
  