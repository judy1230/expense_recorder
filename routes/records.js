const express = require('express')
const router = express.Router()
const Record = require('../models/record.js')
const { authenticated } = require('../config/auth.js')

//create new records
router.get('/new', authenticated, (req, res) =>{
	res.render('new')
})
//create new records
router.post('/', authenticated, (req, res) => {
	const { name, category, date, amount} = req.body
	let errors = []
	const record = Record({
		userID:  req.user._id,
		name: req.body.name,
		category: req.body.category,
	  date: req.body.date,
		amount: req.body.amount
	})
  //console.log('record', record)
	if (!name || !category || !date || !amount) {
		errors.push({ message: '所有項目必填!' })
		console.log('errors.length', errors.length)
	}
  
	if (errors.length > 0) {
		res.render('new', {
			errors,
			name,
			category,
			date,
			amount
		})
	}	else {
    record.save((err) => {
		if(err) return console.log(err)
		console.log(`add ${req.body.name} is in mongodb!`)
		return res.redirect('/')
	})
	}

})

//modify records
router.get('/:id/edit', authenticated, (req, res) => {
	//res.send('modify-record page')
	Record.findById(req.params.id, (err, record) =>{
		return res.render('edit', {record, record})
	})
})
router.put('/:id', authenticated, (req, res) => {
	//res.send('modify record')
	Record.findById(req.params.id, (err, record) => {
		record.name = req.body.name,
		record.date = req.body.date,
		record.category = req.body.category,
		record.amount = req.body.amount
		console.log('req.params.id', req.params.id)
		record.save((err) => {
			return res.redirect('/')
		})
	})
})


//delete record
router.delete('/:id/delete', authenticated, ( req, res ) =>{
	//res.send('delete record')
	Record.findOne({ _id: req.params.id }, (err, record) =>{
		console.log('req.param.id', req.param.id)
		if(err) return console.error(err)
		  record.remove(err =>{
				if(err) return console.error(err)
				  return res.redirect('/')
			})
	})
})

module.exports = router