
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://arjunps:arjunps@arjcluster.brhfz.mongodb.net/SHERLOCK?retryWrites=true&w=majority`);

const Schema = mongoose.Schema;
const UserSchema = new Schema({
	name:String,
	email:String,
	mobile:Number,
	username:String,
	password:String
})
const UserData = mongoose.model('usersData',UserSchema)
module.exports = UserData;