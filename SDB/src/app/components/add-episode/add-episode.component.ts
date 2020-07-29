import { Component, OnInit } from '@angular/core';
import { EpisodeService } from '../../service/episode.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.css']
})
export class AddEpisodeComponent implements OnInit {

  constructor(
  	private _episodeService:EpisodeService,
  	private _router: Router,
    private _authService:AuthService
  ) { }

  title = "Add an episode"
  episodeId = ''

  episodeData = {
  	season:null,
  	episodeNumber:null,
  	title:null,
  	plot:null,
  	imageUrl:null
  }

   addEpisode(){

      if(this.title=="Add an episode"){
        this._episodeService.newEpisode(this.episodeData).
        subscribe( (data) =>    this._router.navigate(['']) )
      }else{
        this._episodeService.editEpisode(this.episodeData,this.episodeId).
        subscribe(res => {
          this._router.navigate([''])          
        },err => console.log(err))
      }

  	}

  ngOnInit(): void {
    const currentUrl =  this._router.url.split('/');
    this.episodeId = currentUrl[currentUrl.length-1];
      if(!this._authService.getUser()){
        this._router.navigate([''])
      }
      else if(this.episodeId!="admin"){
        this.title = "Edit Episode";
        this._episodeService.getSingleEpisode(this.episodeId )
        .subscribe(res => {
          if(!res){
            this._router.navigate([''])
          }else{
            const {season,episodeNumber,title,plot,imageUrl}
                =res["episodes"]
            this.episodeData= {...this.episodeData,season,episodeNumber,title,plot,imageUrl};
          }

        },err => console.log(err))
      }
  }


}
