import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FindFriendService } from '../find-friend.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  myjson = localStorage.getItem("data");
  obj = JSON.parse(this.myjson);
  firstname = this.obj.message[0].firstname;
  
  constructor(private router: Router, private findfriendservice: FindFriendService) { }

  ngOnInit() {    
  }
  
  friendName = '';
  flag1 = false;
  flag2 = '';
  flag3 = false;
  flag4 = false;
  value = '';
  msg = '';
  //searching of friends
  findfriend(value){
    //this.friend = value;
    if(value.searchuser.length == 0){
      console.log("user typed nothing");
    }
    else if(value.searchuser.length > 0){
      // console.log("user typed", value);
      this.flag1 = true;
      this.findfriendservice.findfriend(value)
        .subscribe(data => {
        console.log("data received from backend", data);
        let data1 = JSON.stringify(data);
        let data2 = JSON.parse(data1);
        // console.log(data2.value);
        localStorage.setItem('friendsInfo', data1);
        let flag = true;
        let flag1 = JSON.stringify(flag);
        localStorage.setItem('reload', flag1);
        // console.log("here is data", data2);
        
        this.value = data2.value;
        this.msg = data2.message;

        // if(!data2.error){
        //   //console.log("i have searched for", data2.message[0].username);
        //   this.friendName = data2.message[0].username;
        //   this.flag4 = true;
        //   this.flag3 = true;
        //   //this.router.navigateByUrl('/userprofile');
        //   // this.router.navigateByUrl('/search');
        // }
        // else{
        //   //console.log("user not found");
        //   this.friendName = "user not found";
        //   this.flag4 = true;
        // }
      })
    }
  }

  logout(){
    console.log("made it inside logout function");
    localStorage.clear();
    console.log("local storage has been cleared");
    this.router.navigateByUrl('/');
  }

}

