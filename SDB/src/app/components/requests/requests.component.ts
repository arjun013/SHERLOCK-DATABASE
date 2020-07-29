import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CharacterService } from '../../service/character.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
	
	requestCharacters = <any>[];

  constructor(
        private _characterService:CharacterService,
        private _authService:AuthService,
        public _router : Router
        ) { }

  ngOnInit(): void {

  		if(!this._authService.getUser()){
  			this._router.navigate([''])
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


  acceptRequest(id){
  	this._characterService.acceptCharacter(id)
      	.subscribe(res => {
      		this.requestCharacters = res
      		console.log(res)
      	},err => console.log(err))
  }
  removeRequest(id){
  		this._characterService.removeCharacter(id)
      	.subscribe(res => {
      		this.requestCharacters = res
      		console.log(res)
      	},err => console.log(err))
  }

}
