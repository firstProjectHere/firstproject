import { Component, OnInit } from '@angular/core';
import { SearchuserService } from '../searchuser.service';
import { DeclineRequestService } from '../decline-request.service';
import { ConfirmRequestService } from '../confirm-request.service';
import { UnfriendUserService } from '../unfriend-user.service';
import { ShowPendingRequestService } from '../show-pending-request.service';
import { FetchingImageService } from '../fetching-image.service';
import { ShowFriendListService } from '../show-friend-list.service';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
// import { isNgTemplate } from '@angular/compiler';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

const uri = 'http://localhost:3000/file/upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    myjson = localStorage.getItem("data");
    obj = JSON.parse(this.myjson);
    firstname = this.obj.message[0].firstname;
    lastname = this.obj.message[0].lastname;


  uploader:FileUploader = new FileUploader({url:uri});

  attachmentList:any = [];
  displayPicture:any = [];
  
  flagBoolean0 = false;
  flag0 = '';
  flagBoolean1 = false;
  flag1 = '';
  foundNOfound = false;
  imageUrl:string = "";
  
  constructor(private searchuserservice: SearchuserService, private router: Router, private confirmrequestservice: ConfirmRequestService, private declinerequestservice: DeclineRequestService, private unfriendservice: UnfriendUserService, private showpendingrequestservice: ShowPendingRequestService, private showfriendlistservice: ShowFriendListService, private fetchingimg: FetchingImageService, private domSanitizer: DomSanitizer) {

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
      this.uploader.options.additionalParameter = {
        firstname: this.firstname
      };
    }    
    
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) =>{
      this.attachmentList.push(JSON.parse(response));
    }
  }
  nameForImg= {
    me:''
  }
  flag44 = false;
  playerSrc : SafeResourceUrl|String = '';

  displayImg(){
    this.nameForImg.me = this.firstname;
    console.log("my cred ", this.nameForImg);
    this.fetchingimg.displayImg(this.nameForImg)
    .subscribe(data11 => {
      if(data11){
        console.log("this is data ", data11);
        // this.displayPicture.push(data11);
        // console.log('array is ', this.displayPicture)
        this.image(data11);
      }
      // let data1 = JSON.parse(JSON.stringify(data11));
      // this.imagesrc = data1.imagePath;
      // console.log(this.imagesrc);
    })
  }

  

  image(data){
     let data1 = JSON.parse(JSON.stringify(data));
     this.flag44 = true;
      this.imageUrl = data1.imagePath;
      this.playerSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(this.imageUrl);
      console.log("this is image url ",this.imageUrl);
  }

  ngOnInit() {
    this.displayImg();
  }

    
    myDetail= {
      me:""
    }
    
    usernames=[];

    showPendingRequest(){
      this.myjson = localStorage.getItem("data");
      this.obj = JSON.parse(this.myjson);
      this.myDetail.me = this.obj.message[0].username;
      console.log('my name is ', this.myDetail);
     this.showpendingrequestservice.showPendingRequest(this.myDetail)
        .subscribe(data1 => {
          console.log("data received from backend pending request ", data1);
          //console.log("my pending list has ", data1.message[0].pendingrequest.length, " friends");
          let data = JSON.parse(JSON.stringify(data1));
          if(data.message[0].pendingrequest.length == 0){
            this.flagBoolean0 = true;
            this.flag0 = "You have no pending request";
          }
          else if(data.message[0].pendingrequest.length > 0){
            this.usernames = data.message[0].pendingrequest;
          }
        });
    }

    hide= true;

    confirm={
      friend:"",
      me:""
    };

    //to confirm pending request
    confirmUser(friend){
      this.hide = false;
      this.confirm.friend=friend;
      this.myjson = localStorage.getItem("data");
      this.obj = JSON.parse(this.myjson);
      this.confirm.me = this.obj.message[0].username;
      console.log("my name is", this.confirm);
      console.log('to confirm his request ',this.confirm );
      this.confirmrequestservice.confirmUser(this.confirm)
      .subscribe(data=>{
        console.log("both of them added", data);
      })
    }

    decline= {
      friend:"",
      me:""
    }
    //to decline pending request
    declineUser(nofriend){
      this.hide = false;
      this.decline.friend = nofriend;
      this.myjson = localStorage.getItem("data");
      this.obj = JSON.parse(this.myjson);
      this.decline.me = this.obj.message[0].username;
      console.log("decline object is", this.decline);
      this.declinerequestservice.declineUser(this.decline)
       .subscribe(data=>{
           console.log('response from decline service here', data);
        });
    }

  

    myName = {
      me: ''
    }

    friendsname = [];
    friendsarezero = false;

    public showFriendList(){      
      this.myjson = localStorage.getItem("data");
      this.obj = JSON.parse(this.myjson);
      this.myName.me = this.obj.message[0].username;
      console.log('my name is ', this.myName);
     this.showfriendlistservice.showFriendList(this.myName)
        .subscribe(data2 => {
          console.log("my friend list has ", data2);
          let data = JSON.parse(JSON.stringify(data2));
          if(data.message[0].myfriends.length == 0){
            this.flagBoolean1 = true;
            this.flag1 = "You have no friends";
          }
          else if(data.message[0].myfriends.length > 0){
            this.friendsname = data.message[0].myfriends;
          }
        });
    }

    searchuser='';
    
    searchfriend(value){
      if(value.searchuser.length == 0){
        console.log('user searched blank');
      }
      else if(value.searchuser.length > 0){
        console.log("user want to search", value.searchuser);
      this.searchuserservice.searchfriend(value)
        .subscribe(data=>{
          console.log('in frontend>>>>>>in profile.ts from searchuser service', data);
          let myfrienddata = JSON.stringify(data);
          let objfrienddata = JSON.parse(myfrienddata);
          localStorage.setItem('searchedFriendInfo', myfrienddata);
          //console.log("searched user name is ", objfrienddata.message[0].username);
          if(!objfrienddata.error){
            this.router.navigateByUrl('/userprofile');
          }
          else{
            this.foundNOfound = true;
          }

        });
      }
    }

    //unfriend user here

    unfriend={
      friend:"",
      me:""
    };

    unfriendUser(user){
      console.log("he will be unfriend now", user);
      this.unfriend.friend = user;
      this.myjson = localStorage.getItem("data");
      this.obj = JSON.parse(this.myjson);
      this.unfriend.me = this.obj.message[0].username;
      console.log(this.unfriend);
      this.unfriendservice.unfriendUser(this.unfriend)
        .subscribe(data =>{
          console.log(data);
        })

    }    
    
}
