import { Component, OnInit } from '@angular/core';
import { RealChattingService } from '../real-chatting.service';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.component.html',
  styleUrls: ['./chatting.component.css']
})
export class ChattingComponent implements OnInit {

  user:String;
  room:String;
  messageText:String;
  messageArray:Array<{user:String,message:String}> = [];

  constructor(private realchattingservice: RealChattingService) { 
         this.realchattingservice.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));


        this.realchattingservice.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.realchattingservice.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
  }

  ngOnInit() {
  }

  join(){
        this.realchattingservice.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this.realchattingservice.leaveRoom({user:this.user, room:this.room});
    }

    sendMessage()
    {
        this.realchattingservice.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}
