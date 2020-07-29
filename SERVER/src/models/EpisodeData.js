
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://arjunps:arjunps@arjcluster.brhfz.mongodb.net/SHERLOCK?retryWrites=true&w=majority`);

const Schema = mongoose.Schema;
const EpisodeSchema = new Schema({
	season:String,
	episodeNumber:Number,
	title:String,
	plot:String,
	imageUrl:String,
	comments:[Schema.Types.Mixed],
	rating:[Schema.Types.Mixed],
	averageRating:Number
})
const EpisodeData = mongoose.model('episodesData',EpisodeSchema)
module.exports = EpisodeData;