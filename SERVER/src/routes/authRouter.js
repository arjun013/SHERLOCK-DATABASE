
const express = require('express');
const mongoose = require('mongoose');
const UserData = require('../models/UserData');
const jwt = require('jsonwebtoken');

const authRouter = new express.Router();



//signup a user

authRouter.post('/signup',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ")
		const { name,email,mobile,username,password } = req.body.user;
		const newUser = {
			name,
			email,
			mobile,
			username,
			password
		}
		const userSave = UserData(newUser);
		UserData.findOne({username:userSave.username},(err,user) =>{
			if(err) console.log(err)
				else if(user) res.status(401).json("username taken")
					else {
							userSave.save();
							res.status(200).json(user)
						}
				})
		})

//login user
authRouter.post('/login',(req,res) => {
	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Methods: GET , POST, PATCH , PUT , DELETE , OPTIONS ");

		const {username,password} = req.body.user;
		UserData.findOne({ username : username  },(err,user) => {
			if(err) console.log(err)
				else if(!user) res.status(401).send("Username Not Found")
					else if(user.password!==password) res.status(401).send("invalid password")
						else {
							    const payload = { subject : user._id };
					        	const token = jwt.sign(payload,"thirteen");
					        	res.status(200).send({token,username});
						}
		})
})

module.exports = authRouter;