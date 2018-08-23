import { Component, OnInit } from '@angular/core';
import { SendingRequestService } from '../sending-request.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  flagBooleanButton = false;
  flagBooleanDropDown = true;
  flag = '';

  constructor( private sendingrequest: SendingRequestService) { }


  ngOnInit() {
    console.log('inside userprofile component>>>>>>>>', this.friendInfo);
  }
  Info = localStorage.getItem('friendsInfo');
  friendInfo = JSON.parse(this.Info);
  friendName = this.friendInfo.message;
  
  myjson = localStorage.getItem("data");
  obj = JSON.parse(this.myjson);

  names={
    myname:this.obj.message[0].username,
    username : this.friendInfo.message[0].username,
  };
  
  sendingnames(){
    console.log('confirm button has been clicked');
    this.sendingrequest.sendingnames(this.names)
    .subscribe(data=>{
      console.log("data received from server", data);
      let dataTOjson = JSON.stringify(data);
      let dataTOparse = JSON.parse(dataTOjson);

      if(!dataTOparse.error){
      this.flag= "Request sent successfully";
      this.flagBooleanButton = true;
      this.flagBooleanDropDown = false;
      }

    });
  }
  
}
