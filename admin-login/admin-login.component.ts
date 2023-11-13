import { Component } from '@angular/core';
import {FormGroup,FormControl} from '@angular/forms';
import { AdminLoginService } from '../admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent {
  
  
  loginRef = new FormGroup({
    emailId: new FormControl(),
    password: new FormControl()
  });
  msg:string="";
  
  constructor(public adminLoginService:AdminLoginService, public router:Router){}

  signIn(): void{
    let login = this.loginRef.value;
    let res =  this.adminLoginService.checkAdminLoginDetails(login);
    

    if(res){
      this.msg="";
      alert("Successfully login")
      this.router.navigate(["dashboard"])

      
    }else{
      this.msg="Invalid Email ID or Password";
    }
  }
  

  

}
