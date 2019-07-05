const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
	// userID: {
	// 	type: ,
	// 	ref: 'User',
	// 	index: true,
	// 	required: true
	// },
	userID: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	category: {
		type:String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	// createdAt:{
	// 	type: Schema.Types.Date
	// },
	amount: {
		type: String,
		required: true
	}
	
})

module.exports = mongoose.model('Record', recordSchema)