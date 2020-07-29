import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CharacterService } from '../../service/character.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

	characters = <any>[];

  searchResult = <any>[];
        searchWord = '';

        searchCharacter(){
          this.searchResult = 
          this.characters.filter( ( result ) =>{
            return result.name.toLowerCase().includes(this.searchWord.toLowerCase())
          })
        }

        hideResult = true;
        hideAgain(){
          if(this.hideResult){
            this.searchWord = ''
          }
        }

  constructor(
        private _characterService:CharacterService,
        private _authService:AuthService
        ) { }

  ngOnInit(): void {
  		this._characterService.getCharacters()
      	.subscribe(
	      res =>{
	      let chars = <any> [];
	      chars = res
	      	this.characters = chars.filter( char=> char.approved);
	      	
	      } ,
	      err => console.log(err) )
  }
}
