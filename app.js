const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record.js')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://127.0.0.1/record',  { useNewUrlParser: true })

const db = mongoose.connection

db.on('err', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')
})


//set routers
//record首頁
app.get('/', (req, res) =>{
	Record.find((err, records) =>{
		if(err) return console.error(err)
		return res.render('index', { records: records})
	})
})


//create new records
app.get('/records/new', (req, res) =>{
	res.render('new')
})
//create new records
app.post('/records', (req, res) => {
	const record = Record({
		name:req.body.name,
		category: req.body.category,
		// date: req.body.calendarpicker,
		amount: req.body.amount
	})

	record.save((err) => {
		if(err) return console.log(err)
		console.log(`add ${req.body.name} in mongodb!`)
		return res.redirect('/')
	})
})

//modify records
app.get('/records/:id/edit', (req, res) => {
	//res.send('modify-record page')
	Record.findById(req.params.id, (err, record) =>{
		return res.render('edit', {record, record})
	})
})
app.post('/records/:id', (req, res) => {
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

//show record
// app.get('/records/:id', (req,res) =>{
// 	res.send('display record info.')
	
// })

//delete record
app.post('/records/:id/delete', ( req, res ) =>{
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


//filter Records
app.get('/filter', (req, res) => {
	//console.log('req.query.month', req.query.month)
	//console.log('req.query.category', req.query.category)
	Record.find((err, records) => {
		const month = req.query.month
		const keyword = req.query.category
		
		console.log('month', month)
		console.log('category', keyword)
		if (err) return console.error(err)
		//console.log('test', test)
		const recordSearch = records.filter(({ month, category }) => {
			if (keyword == []){
				return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) }})
			}
		
			return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) } } && category.toLowerCase().includes(keyword.toLowerCase()))
		})
		console.log('recordSearch', recordSearch)
		return res.render('index', { records: recordSearch })
  })
})


// app.get('/records/filter', (req, res) => {
// 	const month = req.query.month
// 	console.log('req.query.month', req.query.month)
// 	const recordsSearch = records.filter(({ name, category }) => {
// 		console.log(date)
// 		console.log(categoryAasasz)
// 		// return (name || category) includes keyword
// 		return Record.find({ created_on: { $gte: new Date(2019, 6, 1), $lt: new Date(2019, 7, 31) } } && category.toLowerCase().includes(keyword.toLowerCase()))
// 	})
// 	return res.render('index', { records: recordsSearch })
	

// })







app.listen(2130, () =>{
	console.log('app is running on localhost:2130!!')
})
