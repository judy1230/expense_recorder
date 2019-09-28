const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const { authenticated } = require('../config/auth.js')

//create new records
router.get('/new', authenticated, (req, res) =>{
	res.render('new')
})
//create new records
router.post('/', authenticated, (req, res) => {
	const { name, category, date, amount} = req.body
	let errors = []
	Record.create({
		name: req.body.name,
		category: req.body.category,
		date: req.body.date,
		amount: req.body.amount,
		UserId: req.user.id
	})

		.then((record) => { 
			if (!name || !category || !date || !amount) {
				errors.push({ message: '所有項目必填!' })
			}

			if (errors.length > 0) {
				res.render('new', {
					errors,
					name,
					category,
					date,
					amount
				})
			} else {
				record.save((err) => {
					if (err) return console.log(err)
					console.log(`add ${req.body.name} is in sequelize!`)
					return res.redirect('/')
				})
			}
			return res.redirect('/') })
		.catch((error) => { return res.status(422).json(error) })

})

//modify records
router.get('/:id/edit', authenticated, (req, res) => {
	User.findByPk(req.user.id)
		.then((user) => {
			if (!user) throw new Error("user not found")
			return Record.findOne({
				where: {
					Id: req.params.id,
					UserId: req.user.id,
				}
			})
		})
		.then((record) => { return res.render('edit', { record: record })})  
})

router.put('/:id', authenticated, (req, res) => {
	Record.findOne({
		where: {
			Id: req.params.id,
			UserId: req.user.id,
		}
	})
		.then((record) => {
			record.name = req.body.name
			record.category = req.body.category
			record.date = req.body.date
			record.amount = req.body.amount

			return record.save()
		})
		.then((record) => { return res.redirect('/') })
		.catch((error) => { return res.status(422).json(error) })
})


//delete record
router.delete('/:id/delete', authenticated, ( req, res ) =>{
	User.findByPk(req.user.id)
		.then((user) => {
			if (!user) throw new Error("user not found")

			return Record.destroy({
				where: {
					UserId: req.user.id,
					Id: req.params.id
				}
			})
		})
		.then((record) => { return res.redirect('/') })
		.catch((error) => { return res.status(422).json(error) })
})

module.exports = router