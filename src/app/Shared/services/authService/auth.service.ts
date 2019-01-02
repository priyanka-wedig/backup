import { Injectable } from '@angular/core';
import  {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper = new JwtHelperService();

  constructor(private router:Router) { }
  logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
    
  }
  isLoggedIn(){
    let token = localStorage.getItem('token');
    // console.log(token);
    if(!token){
   
      return false;
    }else{
    
      return this.helper.isTokenExpired(token);
    }
  }
  getCurrentUser(){
    let token=localStorage.getItem('token');
    if(!token) return null;

    return this.helper.decodeToken(token);
  }
}
