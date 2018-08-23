import { Component, OnInit } from '@angular/core';
import { FirstLoginService } from '../first-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginSuccessFlag= false;

  constructor(private firstlogin: FirstLoginService, private router: Router) { }

  ngOnInit() {
  }


  loginUser(user){
    this.firstlogin.loginUser(user)
      .subscribe(data=>
      {
        console.log("data is ", data);
        let myjson = JSON.stringify(data);
        let obj = JSON.parse(myjson);
        localStorage.setItem('data', myjson);
        //console.log("<br/> username is ", obj.message[0].firstname);
        if(!obj.error){
          this.router.navigateByUrl('/profile');
        }
        else{
          this.router.navigateByUrl('/');
          this.loginSuccessFlag = true;
        }
      }); 
  }
}
