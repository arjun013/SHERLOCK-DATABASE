
const express = require('express');
const mongoose = require('mongoose');
const CharData = require('../models/CharData');
const jwt = require('jsonwebtoken');

const characterRouter = new express.Router();

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


	characterRouter.get('/',verifyToken, function(req, res) {
				res.header("Access-Control-Allow-Origin","*");
				res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
				
				CharData.find()
				.then( (characters) => res.json(characters))
				.catch( (err) => console.log("Error characters:"+err))

	})

	characterRouter.post('/add',verifyToken, function(req, res) {

				res.header("Access-Control-Allow-Origin","*");
				res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
				const { name,playedBy,description,status,image,approved} = req.body.character;

				const item = {
					name,
					playedBy,
					description,
					status,
					image,
					approved
				}
		  		const character =CharData(item);
		  		character.save();
		  		console.log(item);
		  		res.json(character)
	})	

characterRouter.get('/remove/:id',verifyToken, function(req, res) {
				res.header("Access-Control-Allow-Origin","*");
				res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
				const _id = req.params.id;

				CharData.findOneAndDelete( { _id})
				.then( (character) => {
					console.log('deleted ')
				})
				.catch( (err) => console.log("Error :"+err))
				CharData.find()
				.then( (characters) => res.json(characters.filter(char => !char.approved)))
				.catch( (err) => console.log("Error characters:"+err))
})

characterRouter.get('/accept/:id',verifyToken, function(req, res) {
				res.header("Access-Control-Allow-Origin","*");
				res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
				const _id = req.params.id;
				CharData.findOneAndUpdate( { _id},{ approved:true },(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('approved')
					}
				})

				CharData.find()
				.then( (characters) => res.json(characters.filter(char => !char.approved)))
				.catch( (err) => console.log("Error characters:"+err))
})

characterRouter.get('/single/:id',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");
	const _id = req.params.id;
	CharData.findOne({_id})
	.then( (character) => res.json(character))
	.catch( (err) => res.json(false))
})

	characterRouter.post('/edit',verifyToken, function(req, res) {

				res.header("Access-Control-Allow-Origin","*");
				res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
				const _id = req.body._id;
				const { name,playedBy,description,status,image,approved} = req.body.character;

				const item = {
					name,
					playedBy,
					description,
					status,
					image,
					approved
				}

				CharData.findOneAndUpdate( {_id},item,(err,result) =>{
					if(err){
						console.log(err)
					}else{
						console.log('character data updated and approved')
					}
				})

		  		res.json("character added")
	})	

module.exports = characterRouter;

