import { Component, OnInit } from '@angular/core';
import { FirstRegisterService } from '../first-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private firstregister: FirstRegisterService) { }

  ngOnInit() {
  }

  firstname='';
  lastname='';
  username='';
  password='';

  registerUser(user){
    this.firstregister.registerUser(user);
  }
}
