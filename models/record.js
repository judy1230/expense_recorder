const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
	// userID: {
	// 	type: String,
	// 	required: true
	// },
	category: {
		type:String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	amount: {
		type: String,
		required: true
	},
	totalAmount: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('Record', recordSchema)