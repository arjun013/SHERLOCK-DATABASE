import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  	private _signupUrl 
  		=	"http://localhost:8000/auth/signup"
	private _logUrl 
		="http://localhost:8000/auth/login"

  constructor( private http:HttpClient ) { }
  	//sign up a user info
  	signupUser(userData){
  		return this.http.post(this._signupUrl,{"user":userData});
  	}
    loginUser(userData){
      return this.http.post(this._logUrl,{"user":userData});
    }
    loggedIn(){
      return !!localStorage.getItem('token');
    }
    getToken(){
      return localStorage.getItem('token');
    }
    getUser(){
    	return sessionStorage.getItem('activeUser')==='admin';
    }
    getActiveUser(){
      return sessionStorage.getItem('activeUser');
    }
    sessionValid(){
      if(sessionStorage.getItem('activeUser') ==null || localStorage.getItem('token') ==null){
          localStorage.removeItem('token');
          sessionStorage.removeItem('activeUser');
          return false;
      }
      return true;
    }
}