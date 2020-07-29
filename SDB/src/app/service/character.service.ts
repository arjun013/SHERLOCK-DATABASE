import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http:HttpClient) { }

  private _charGetUrl 
  	=	"http://localhost:8000/characters"
  private _charAddUrl 
  	=	"http://localhost:8000/characters/add"
  private _charEditUrl 
  	=	"http://localhost:8000/characters/edit"


  	getCharacters( ){
	  	return this.http.get(this._charGetUrl)
  	}

  	getSingleCharacter(id){
	  	return this.http.get(this._charGetUrl+'/single/'+id,)
  	}

  	newChar(char){
	  	return this.http.post(this._charAddUrl,{"character":char})
	}

	acceptCharacter(id){
		return this.http.get(this._charGetUrl+"/accept/"+id)
	}
	removeCharacter(id){
		return this.http.get(this._charGetUrl+"/remove/"+id)
	}

	editChar(characterData,_id){
		return this.http.post(this._charEditUrl,{"character":characterData,_id})
	}
}
