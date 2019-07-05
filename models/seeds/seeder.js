const mongoose = require('mongoose')
const Record = require('../record.js')
const recordList = require('./record.json')
const User = require('../user.js')
const bcrypt = require('bcryptjs')

const templeUser = [{ name: '', email: 'user1@example.com', password: '12345678' },
{ name: '', email: 'user2@example.com', password: '12345678' }]


mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', () => {
	console.log('db error')
})

db.once('open', () => {
	console.log('db connected!')

	for (let i = 0; i < templeUser.length; i++) {
		name = templeUser[i].name
		if (name == []) {
			name = '廣志先生'
		}
		email = templeUser[i].email
		password = templeUser[i].password
		generateNewUser(name, email, password)
	}

	function generateNewUser(name, email, password, index) {
		const newUser = new User({ name, email, password })

		bcrypt.genSalt(10, (err, salt) =>
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err
				newUser.password = hash
				newUser.save().then((user) => {
					generateRecords(user, recordList)
				})
			})
		)
	}
	console.log('done')
})	

function generateRecords(user, recordList){
		for (let j = 0; j < recordList.results.length; j++) {
			Record.create({
				"userID": user._id,
				"name": recordList.results[j].name,
				"category": recordList.results[j].category,
				"timestamp": recordList.results[j].timestamp,
				"amount": recordList.results[j].amount
			})
		}
	console.log('records insert done')
}
