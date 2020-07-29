import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../service/character.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-character',
  templateUrl: './add-character.component.html',
  styleUrls: ['./add-character.component.css']
})
export class AddCharacterComponent implements OnInit {

	characterData = {
		name:"",
		playedBy:"",
		description:"",
		status:"",
    image:"",
    approved:<any> ""
	}

  title = "Add new Character"
  charId = ''
	
  constructor(
    private _characterService:CharacterService,
    private _router: Router,
    private _authService:AuthService
  ) { }

  ngOnInit(): void {

    const currentUrl =  this._router.url.split('/');
    this.charId = currentUrl[currentUrl.length-1];
    if(this.charId  !=='add-character'){
      if(!this._authService.getUser()){
        this._router.navigate([''])
      }
      else{
        this.title = "Edit Character";
        this._characterService.getSingleCharacter(this.charId )
        .subscribe(res => {
          if(!res){
            this._router.navigate([''])
          }
          let dataRetrieved = <any>{};
          for(let key in res){
            if(key!=="_id" && key!=="__v") dataRetrieved[key] = res[key]
          }
          this.characterData= {...dataRetrieved};
        },err => console.log(err))
      }
    }

  }

  addCharacter(){
    this.characterData.approved = this._authService.getUser()

    if(this.title=="Edit Character"){
      this._characterService.editChar(this.characterData,this.charId).
      subscribe(res => {
      console.log(res)
          this._router.navigate(['characters']) 
            alert("Updated and Posted")           
        },err => console.log(err))


    }else{
        this._characterService.newChar(this.characterData).
        subscribe(res => {
          this._router.navigate(['characters'])
          if(!this._authService.getUser()) 
            alert("Request Sent")           
        },err => console.log(err))
    }


    
        for(let key in this.characterData){
          this.characterData[key] = ""
        }

  }


}
