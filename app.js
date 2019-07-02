const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Record = require('./models/record.js')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
mongoose.connect('mongodb://127.0.0.1/expense',  { useNewUrlParser: true })

const db = mongoose.connection

db.on('err', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')
})


//set routers
//record首頁
app.get('/',(req, res) =>{
	res.render('index')
})
//列出全部records
app.get('/records', (req, res) =>{
  res.send('列出全部records')
})

//create new records
app.get('/records/new', (req, res) =>{
	res.send('create-records page')
})
//create new records
app.post('/records', (req, res) => {
	res.send('create record')
})

//modify records
app.get('/records/:id/edit', (req, res) => {
	res.send('modify-record page')
})
app.post('/records/:id', (req, res) => {
	res.send('modify record')
})

//show record
app.get('/records/:id', (req,res) =>{
	res.send('display record info.')
})

//delete record
app.post('/records/:id/delete', ( req, res ) =>{
	res.send('delete record')
})

app.listen(2130, () =>{
	console.log('app is running on localhost:2130!!')
})
