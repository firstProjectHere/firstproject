import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendingRequestService {

  headers = new HttpHeaders({"Content-Type" : "application/json"});

  constructor( private http: HttpClient ) { }

  public sendingnames(names){
    console.log('data to send is ', names);
    return this.http.post('http://localhost:3000/confirmrequest', names, {headers:this.headers});
    
  }
}
