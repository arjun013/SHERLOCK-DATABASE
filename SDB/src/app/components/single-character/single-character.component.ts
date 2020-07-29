import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CharacterService } from '../../service/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-character',
  templateUrl: './single-character.component.html',
  styleUrls: ['./single-character.component.css']
})
export class SingleCharacterComponent implements OnInit {

  constructor(
        private _characterService:CharacterService,
  		  public _router: Router,
        public _authService:AuthService) { }

        characterId=
  		this._router.url.split('/')[this._router.url.split('/').length - 1];
     	
     	characterData = <any>{};

  ngOnInit(): void {
  	this._characterService.getSingleCharacter(this.characterId)
      	.subscribe(
	      res =>{
          if(!res) this._router.navigate([''])
	      	this.characterData = res;
	      },
	      err => console.log(err) )
  }

}
