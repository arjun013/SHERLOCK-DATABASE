
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://arjunps:arjunps@arjcluster.brhfz.mongodb.net/SHERLOCK?retryWrites=true&w=majority`);

const Schema = mongoose.Schema;
const CharacterSchema = new Schema({
	name:String,
	playedBy:String,
	description:String,
	status:String,
	image:String,
	approved:Boolean
})
const CharacterData = mongoose.model('characterData',CharacterSchema)
module.exports = CharacterData;