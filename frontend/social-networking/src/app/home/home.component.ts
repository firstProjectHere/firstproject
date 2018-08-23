import { Component, OnInit } from '@angular/core';
import { PostUploadService } from '../post-upload.service';
import { PostShowService } from '../post-show.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private postupload: PostUploadService, private posstshowservice: PostShowService) { }

  ngOnInit() {   

    this.showPost();

  }

  flagPostWhenValueIsZero = false;
  flagPostWhenValueIsOne = false;
  postArray = []; 

  showPost(){
    this.myNameCred.me = this.obj.message[0].username;
    this.posstshowservice.showPost(this.myNameCred)
      .subscribe(dataPost =>{
        console.log("post received from backend ",dataPost);
        let datapost = JSON.parse(JSON.stringify(dataPost));
        // console.log("post received from backend ",datapost);

        if(datapost.value == 0){
          this.flagPostWhenValueIsZero = true;
        }
        else if(datapost.value == 1){
          this.flagPostWhenValueIsOne = true;
          this.postArray = datapost.data;
        }
      })
  }

  myNameCred={
    me:''
  };

  myjson = localStorage.getItem("data");
  obj = JSON.parse(this.myjson);



  //to display the post in card
  flag= false;
  flagDesc= '';
  time='';
  username='';
  postDescription='';
  access='';

  postDet={
    postdata: "",
    access: "",
    username: ""
  };

  displayingPost = [];
  postUpload(value){
    //console.log("post data is ", value);
    this.myjson = localStorage.getItem("data");
    this.obj = JSON.parse(this.myjson);
    let info = JSON.parse(JSON.stringify(value));
    this.postDet.username = this.obj.message[0].username;
    this.postDet.postdata = info.postdata;
    this.postDet.access = info.access;
    //this.postDet.createdDate = new Date();
    //no need for above since default date is set in post schema
    console.log("post data that will be send is ", this.postDet);
    this.postupload.postUpload(this.postDet)
      .subscribe(data1=>{
        console.log("data received from backend", data1);
        let data = JSON.parse(JSON.stringify(data1));
        if(data.message.post_desc.length == 0){
          // this.flag= true;
          // this.flagDesc= 'No news feed';
          console.log("something went wrong"); 
        }
        else if(data.message.post_desc.length > 0){
          this.flag = true; 
          // this.time = data.message.created_at;
          // this.username= data.message.username;
          // this.postDescription = data.message.post_desc;
          // this.access = data.message.access;
          this.displayingPost.unshift(data);
          console.log("this is displaing post here", this.displayingPost); 
        }
      })
  }

}
