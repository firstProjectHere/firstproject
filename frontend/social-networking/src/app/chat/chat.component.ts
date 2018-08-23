import { Component, OnInit } from '@angular/core';
import { ChatFriendListService } from '../chat-friend-list.service';
import { RealChatService } from '../real-chat.service';
import { RenderMessageServiceService } from '../render-message-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatfriendlistservice: ChatFriendListService, private realchatservice: RealChatService, private rendermessageservice: RenderMessageServiceService) { }

  ngOnInit() {

      this.showFriendsList();
  }

  myjson = localStorage.getItem("data");
  obj = JSON.parse(this.myjson);

  myName={
    me:''
  }

  friend= [];

  showFriendsList(){
    this.myName.me = this.obj.message[0].username;
    console.log("my name is chat component is ", this.myName);
    this.chatfriendlistservice.showFriendsList(this.myName)
      .subscribe(data1 =>{
        console.log("Data received from backend is ", data1);
        let data = JSON.parse(JSON.stringify(data1));
        if(data.message[0].myfriends.length == 0){
          console.log("you have no friends");
        }
        else if(data.message[0].myfriends.length > 0){
          console.log("you have ", data.message[0].myfriends.length , " friends");
          this.friend = data.message[0].myfriends;
        }
      })
  } 

  displayRandomText = true;
  displayChatBox = false;
  fnd = '';

  chatData={
    friendName:'',
    myName:'',
    message1:''
  }

  messages=[];

  chatWithUser(friendname){
    // console.log("i want to chat with ", friendname);
    this.chatData.friendName = friendname;
    this.chatData.myName = this.obj.message[0].username;
    this.displayRandomText = false;
    this.displayChatBox = true;
    this.fnd = friendname;
    this.rendermessageservice.chatWithUser(this.chatData)
      .subscribe(allMessagesFetched => {
        console.log("all messages fetched from backend ", allMessagesFetched);
        let allMessages = JSON.parse(JSON.stringify(allMessagesFetched));
        this.messages = allMessages.data;
        console.log(this.messages);
      })

  }
  
  textMessage(msg){
    console.log("this is user msg", msg);
    let Msg = JSON.parse(JSON.stringify(msg));
    this.chatData.message1 = Msg.msg;
    console.log("this will be send back", this.chatData);
    this.realchatservice.textMessage(this.chatData)
      .subscribe(dataMsg => {
        console.log("messages received from backed", dataMsg);
        let datamsg = JSON.parse(JSON.stringify(dataMsg));
        //console.log("user here", datamsg.data.users[0].username1)
      })
  }

}