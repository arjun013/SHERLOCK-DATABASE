import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http:HttpClient) { }

	private _episodesUrl 
  	=	"http://localhost:8000/episodes"
	private _addEpisodeUrl 
		="http://localhost:8000/episodes/episode"

	private _editEpisodeUrl 
		="http://localhost:8000/episodes/edit"

	private _commentsUrl 
  		=	"http://localhost:8000/episodes/comments"

  	private _ratingUrl
  		=	"http://localhost:8000/episodes/rate"

	getEpisodes(){
  		return this.http.get(this._episodesUrl)
  	}

	newEpisode(item){
	  	return this.http.post(this._addEpisodeUrl,{"episode":item})
	}

	editEpisode(item,id){
		return this.http.post(this._editEpisodeUrl+'/'+id,{"episode":item})
	}

	getSingleEpisode(id){
		return this.http.get(this._episodesUrl+'/single/'+id)
	}

	giveRating(id,user,rating){
		return this.http.post(this._ratingUrl,{"id":id , "user":user ,"rating":rating})
	}

	postComment(episodeId,comment){
		return this.http.post(this._commentsUrl+'/'+episodeId,{"comment":comment})
	}

	deleteComment(episodeId,comment){
			return this.http.post(this._episodesUrl+'/commentDelete/'+episodeId,{"comment":comment})
	}
}
