import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { EpisodeService } from '../../service/episode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-episode',
  templateUrl: './single-episode.component.html',
  styleUrls: ['./single-episode.component.css']
})
export class SingleEpisodeComponent implements OnInit {

  constructor(
        private _episodeService:EpisodeService,
  		  private _router: Router,
        public _authService:AuthService) { }

      userRating = 0
      currentUser ='';

  		episodeId=
  		this._router.url.split('/')[this._router.url.split('/').length - 1];
      episodeData = <any>{};

      ngOnInit(): void {

        this.currentUser = this._authService.getActiveUser();

  		this._episodeService.getSingleEpisode(this.episodeId)
      	.subscribe(
	      res =>{
          if(!res) this._router.navigate([''])
	      	this.episodeData = res["episodes"];
          const allRating = this.episodeData["rating"]
          for(let singleRating of allRating){
            if(singleRating.rateUser === this.currentUser){
              this.userRating = singleRating.rateByUser
            }
          }

	      },
	      err => console.log(err) )


      }

      giveRating(rating){
          
          this._episodeService.giveRating(this.episodeId,this.currentUser,rating)
          .subscribe(
          res =>{
            if(!res) this._router.navigate([''])
            this.episodeData = res["episode"];
            this.userRating = res["rateByUser"]
          },
          err => console.log(err) )
      }
}
