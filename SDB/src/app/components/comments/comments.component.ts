import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EpisodeService } from '../../service/episode.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(
  			private _router:Router,
  			private _episodeService:EpisodeService,
  			private _authService:AuthService
  			) { }

  	allComments = <any>[];
  	commentData ={
  		id : null,
  		user : sessionStorage.activeUser,
  		commentMatter :"",

  	}

    edittedMatter =<any>[];//setting an array for indexing
    resetEditMatterAray(){
      for(let comment in this.allComments){
        this.edittedMatter.push('')
      }
    }

  	activeUser = sessionStorage
	episodeId=
	this._router.url.split('/')[this._router.url.split('/').length - 1];

  ngOnInit(): void {  
  	this._episodeService.getSingleEpisode(this.episodeId)
  	.subscribe(res =>{
  		this.allComments = res["episodes"].comments
      this.resetEditMatterAray()      
  	} ,
  				err => console.log('error'))
  }


  postComment(){
  	this.commentData.id =Math.random()+Date.now()
  	this._episodeService.postComment(this.episodeId,this.commentData)
  	.subscribe( res => {
  		this.commentData.commentMatter = '';
  		this.allComments = res["comments"] ;      
      this.resetEditMatterAray()
  	},
      err => console.log('errrr')
        )
  }

  editComment(comment,i){
   this.edittedMatter[i] = comment.commentMatter;
   console.log(this.edittedMatter)
  }

  deleteComment(comment){
   this._episodeService.deleteComment(this.episodeId,comment)
   .subscribe( res => {
  		this.allComments = res["comments"];
  	},
      err => console.log('errr')
        )
  }


}
