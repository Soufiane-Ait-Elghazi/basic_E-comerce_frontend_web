import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  noLogin(dataForm:any) {
    this.authenticationService.login(dataForm.username,dataForm.password);
      if(this.authenticationService.isAuthenticated){
        this.authenticationService.saveAuthenticatedUser();
         this.router.navigateByUrl('');
      }
  }
}
