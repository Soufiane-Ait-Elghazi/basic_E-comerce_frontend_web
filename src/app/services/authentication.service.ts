import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users = [
    {username:'admin',password:'1234',roles:['ADMIN','USER']},
    {username:'user1',password:'1234',roles:['USER']},
    {username:'user2',password:'1234',roles:['USER']}
  ];

  public isAuthenticated:boolean=false;
  public userAutenticated:any;
  public token:string='';

  constructor() { }
  public login(username:string,password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password){
        user = u;
        this.token =btoa(JSON.stringify({username:u.username,roles:u.roles})) ;
      }
    });
    if(user){
      this.isAuthenticated =true;
      this.userAutenticated =user;
    }else{
      this.isAuthenticated =false;
      this.userAutenticated =undefined;
    }
  }

  public isAdmin():boolean{
    if(this.isAuthenticated){
      if(this.userAutenticated.roles.indexOf('ADMIN')>-1){
        return true;
      }
        return false;
    }
    return false;
  }

  public saveAuthenticatedUser(){
    if(this.userAutenticated){
      localStorage.setItem('authToken',this.token);
    }
  }

  public loadUserAuthenticatedFromLocalStorage(){
    let t = localStorage.getItem('authToken');
    if(t) {
      let user = JSON.parse(atob(t))
      this.userAutenticated =user;
      this.isAuthenticated = true;
      this.token = t
    }
  }
  public removeTokenFromLocalStorage(){
    localStorage.removeItem('authToken')
    this.isAuthenticated =false
    this.userAutenticated = undefined
  }
}
