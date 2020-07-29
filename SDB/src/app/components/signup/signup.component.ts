import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormBuilder ,Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginForm = this.fb.group(
    {
      name:[null,[Validators.required]],
       email:[null,[Validators.required,Validators.pattern(/^([A-Za-z0-9\.-]+)@([\w\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/)]],
        mobile:[null,[Validators.required,Validators.min(1000000000), Validators.max(9999999999)]],
         username:[null,[Validators.required]],
          password:[null,[Validators.required,Validators.minLength(6),
            Validators.pattern(/(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])/)]]
    }
  )
  constructor(
  	private _authService:AuthService,
  	private _router: Router,
    private fb:FormBuilder
  ) { }
  showPassword = false;
  logUser :any= {};

  ngOnInit(): void { 
     if(this._authService.loggedIn()) this._router.navigate(['episodes'])
  }
  addUser(){
    for( let key in this.loginForm.value){
      this.logUser[key]=(this.loginForm.value[key])
    }

   this._authService.signupUser(this.logUser)
   .subscribe( res => this._router.navigate(['']),
                err => alert(JSON.stringify(err.error))
  )}
}
