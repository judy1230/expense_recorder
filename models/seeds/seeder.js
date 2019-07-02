const mongoose = require('mongoose')
const Record = require('../record.js')
//const User = require('../user.js')
//const bcrypt = require('bcryptjs')
const recordList = require('../seeds/record.json')

// const templeUser = [{ name: 'Judy', email: 'user1@example.com', password: '12345678' },
// { name: '', email: 'user2@example.com', password: '12345678' }]

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
	console.log('db error!')
})

// db.once('open', () =>{
// 	console.log('db connected!')
// 	//種入user
// 	for (let index = 0; index < templeUser.length; index++){
// 		name = templeUser[index].name
// 		  if (name ===[]){
// 			  name = '億萬富翁'}
// 		email = templeUser[index].email
// 		password = templeUser[index].password
// 		console.log('name', name)
// 		console.log('password', password)
// 		console.log('email', email)
// 		generateNewUser(name, email, password)
// 	}
// })


// function generateNewUser(name, email, password) {
// 	const newUser = new User({ name, email, password })

// 	bcrypt.genSalt(10, (err, salt) =>
// 		bcrypt.hash(newUser.password, salt, (err, hash) => {
// 			if (err) throw err
// 			newUser.password = hash
// 			newUser.save().then((user) => {
// 				console.log('user', user)
// 				console.log('user._id', user._id)
// 				generateRecord(user)
// 			})
// 		})
// 	)
// 	console.log('generate new user done')
// }

// function generateRecord(user){
	db.once('open', () => {
		console.log('db connected!')
		for (let i = 0; i < recordList.results.length; i++) {
			Record.create({
				// "userID": user._id,
				"name": recordList.results[i].name,
				"category": recordList.results[i].category,
				"timestamp": recordList.results[i].timestamp,
				"amount": recordList.results[i].amount,
				"totalAmount": recordList.results[i].totalAmount
			})
		}

		console.log('record insert done')
	})

//}


