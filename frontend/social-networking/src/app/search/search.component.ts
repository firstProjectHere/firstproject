import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    if(this.boolean){
      console.log("boolean value is ", this.boolean);
      window.location.reload();
      localStorage.removeItem('reload');
    }
  }

  Info = localStorage.getItem('friendsInfo');
  friendInfo = JSON.parse(this.Info);
  friendName = this.friendInfo.message[0].username;
  bool = localStorage.getItem('reload');
  boolean = JSON.parse(this.bool);

  
}
