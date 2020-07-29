import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CharacterService } from '../../service/character.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
              public _authService: AuthService,
              public _characterService: CharacterService,
              private _router :Router
              ) { }
  requestCharacters=<any>[]

  ngOnInit(): void {
    if(!this._authService.sessionValid()) {
      this.logoutUser();
    }

        this._characterService.getCharacters()
        .subscribe(
        res =>{
        let chars = <any> [];
        chars = res
          this.requestCharacters = chars.filter( char=> !char.approved);
        } ,
        err => console.log(err) )
  }

  navChangeValid=true;
  navChange(){
	  this.navChangeValid=!this.navChangeValid;
  }


    

  logoutUser(){
    localStorage.removeItem('token');
    sessionStorage.removeItem('activeUser');
    this._router.navigate([''])
  }

}
