import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { EpisodeService } from '../../service/episode.service';


@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css']
})
export class EpisodesComponent implements OnInit {
	
	//for storing seasonwise sorted array of episodes
	seasonWiseEpisodes = <any>[];
  constructor(
        private _episodeService:EpisodeService,
        private _authService:AuthService
        ) { }

        searchResult = <any>[];
        searchWord = '';

        hideResult = true;
        hideAgain(){
          if(this.hideResult){
            this.searchWord = ''
          }
        }

        searchEpisode(){
        	this.searchResult = 
        	this.allEpisodes.filter( ( result ) =>{
        		return result.title.toLowerCase().includes(this.searchWord.toLowerCase())
        	})
        }

        //show episode list on click
        showEpisode =[true,true,true,true,true];

		//for storing all the episodes from db
        allEpisodes = <any> [];
        loadData(){        
	      	function filterSeason(episode) {
			  return episode.season===this;
			}
	      	const season1 = this.allEpisodes.filter(filterSeason,"Season 1");
	      	const season2 = this.allEpisodes.filter(filterSeason,"Season 2");
	      	const season3 = this.allEpisodes.filter(filterSeason,"Season 3");
	      	const season4 = this.allEpisodes.filter(filterSeason,"Season 4");	      	
	      	const special = this.allEpisodes.filter(filterSeason,"Special");
	      	this.seasonWiseEpisodes.push(season1,season2,season3,season4,special);
        }

  ngOnInit(): void {
  	  this._episodeService.getEpisodes()
      .subscribe(
	      res =>{
	      	this.allEpisodes = res;
	      	this.loadData()
	      } ,
	      err => console.log(err) )
  }

}
