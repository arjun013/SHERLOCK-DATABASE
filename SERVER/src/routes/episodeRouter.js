
const express = require('express');
const mongoose = require('mongoose');
const EpisodeData = require('../models/EpisodeData');
const jwt = require('jsonwebtoken');
const episodeRouter = new express.Router();

function verifyToken(req,res,next){
	if (!req.headers.authorization) {
		return res.status(401).json('Unauthorized request 1');
	}
	const token = req.headers.authorization.split(' ')[1];
	if (token==='null') {
		return res.status(401).json('Unauthorized request 2');
	}
	const payload = jwt.verify(token,'thirteen');
	if (!payload) {
		return res.status(401).json('Unauthorized request 3');
	}
	req.userId = payload.subject;
	next();
}

//get all episode data

episodeRouter.get('/',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	EpisodeData.find()
	.then( (episodes) => res.json(episodes))
	.catch( (err) => console.log("Error Episodes:"+err))
})

//post an episode data by admin

episodeRouter.post('/episode',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const { season,episodeNumber,title,plot,imageUrl } = req.body.episode;
		const comments = [];
		const rating = [];
		const averageRating = 0;
		const item = {
			season,
			episodeNumber,
			title,
			plot,
			imageUrl,
			comments,
			rating,
			averageRating
		}
		const episode = EpisodeData(item);
		episode.save();
		console.log('Episode Added Successfully');
		res.json(episode);
})

//edit episode details

episodeRouter.post('/edit/:id',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const _id = req.params.id
	const { season,episodeNumber,title,plot,imageUrl } = req.body.episode;
	const item = {
			season,
			episodeNumber,
			title,
			plot,
			imageUrl
		}
			EpisodeData.findOneAndUpdate( { _id},item,(err,result) =>{
				if(err){
					console.log(err)
				}else{
					console.log('edited')
				}
			})		
				res.json("Success")
})

//get single episode data

episodeRouter.get('/single/:id',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const _id = req.params.id;
	EpisodeData.findOne({_id})
	.then( (episodes) => res.json({episodes}))
	.catch( (err) => res.json(false))
})

//give rating

episodeRouter.post('/rate',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");

	const _id = req.body.id;
	const rateUser = req.body.user;
	const rateByUser = req.body.rating;
	const rating = {
		rateUser,rateByUser
	}

	EpisodeData.findOne({_id})
	.then( (episode) => {
		let isAlreadyRatedUser =false;
		let previousRating = episode.rating;

		for(let singleRating of previousRating){
			if(singleRating.rateUser===rateUser) {
				isAlreadyRatedUser = true;
				break;
			}
		}

		//if the same user already rated
		let temp=[]
		if (isAlreadyRatedUser) {
			temp = previousRating.map((singleRating) =>{
				if (singleRating.rateUser===rateUser) {
					return rating
				} else {
					return singleRating
				}
			})
			console.log(temp)
			previousRating = temp;
			
		} else {
			previousRating.push(rating);
		}
		let totalRate = 0;

		for(let ratingObj in previousRating){
			totalRate += parseInt( previousRating[ratingObj].rateByUser );
		}
		console.log(totalRate)

		const averageRating = parseFloat( totalRate/ (previousRating.length) );
		EpisodeData.findOneAndUpdate( { _id},{rating:previousRating,averageRating},(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('rating updated')
					}
				})

			EpisodeData.findOne({_id})
			.then( (episode) => res.json({episode,rateByUser}))
			.catch( (err) => console.log("Error Rating:"+err))


	})
	.catch( (err) => console.log("Error Episodes:"+err))

})

//post a comment

episodeRouter.post('/comments/:id',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const _id = req.params.id;
	const commentData = req.body.comment;
	EpisodeData.findOne({_id})
	.then( (episode) => {
		let previousComments = episode.comments;
		previousComments.push(commentData);
		EpisodeData.findOneAndUpdate( { _id},{comments:previousComments},(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('comments updated')
					}
				})

		res.json(episode);


	})
	.catch( (err) => console.log("Error Episodes:"+err))
})


//delete a comment

episodeRouter.post('/commentDelete/:id',verifyToken,(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const _id = req.params.id;
	const commentData = (req.body.comment) ;
	EpisodeData.findOne({_id})
	.then( (episode) => {
		let changeComments 
				= episode.comments.filter( (comment) =>{
					return comment.id !== commentData.id;
				} )
		EpisodeData.findOneAndUpdate( {_id},{comments:changeComments},(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('comment deleted')
					}
				})
			EpisodeData.findOne({_id})
			.then( (episode) => res.json(episode))
			.catch( (err) => console.log("Error Episodes:"+err))


	})
	.catch( (err) => console.log("Error Episodes:"+err))
})

module.exports = episodeRouter;
