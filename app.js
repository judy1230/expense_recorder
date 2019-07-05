const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
	require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record.js')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')

const db = mongoose.connection

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://127.0.0.1/record',  { useNewUrlParser: true })

db.on('err', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
	console.log('mongodb connected!')
})

//app.use(express.static('public'))

app.use(session({
	secret: 'aaaaaaaaaaaaaaa',
	resave: 'false',
	saveUninitialized: 'false'   // secret: 定義一組自己的私鑰（字串)
}))
// 使用 Passport 
app.use(passport.initialize())
app.use(passport.session())

// 載入 Passport config
require('./config/passport')(passport)


app.use(flash())

app.use((req, res, next) => {
	res.locals.user = req.user
	res.locals.isAuthenticated = req.isAuthenticated()
	res.locals.success_msg = req.flash('success_msg')
	res.locals.warning_msg = req.flash('warning_msg')
	next()
})

app.use('/', require('./routes/home.js'))
app.use('/records', require('./routes/records.js'))
app.use('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auths.js'))


//set routers
// //record首頁
// app.get('/', (req, res) =>{
// 	Record.find((err, records) =>{
// 		if(err) return console.error(err)
// 		return res.render('index', { records: records})
// 	})
// })


// //create new records
// app.get('/records/new', (req, res) =>{
// 	res.render('new')
// })
// //create new records
// app.post('/records', (req, res) => {
// 	console.log(req)
// 	const record = Record({
// 		name:req.body.name,
// 		category: req.body.category,
// 	  date: req.body.date,
// 		amount: req.body.amount
// 	})

// 	record.save((err) => {
// 		if(err) return console.log(err)
// 		console.log(`add ${req.body.name} in mongodb!`)
// 		return res.redirect('/')
// 	})
// })

// //modify records
// app.get('/records/:id/edit', (req, res) => {
// 	//res.send('modify-record page')
// 	Record.findById(req.params.id, (err, record) =>{
// 		return res.render('edit', {record, record})
// 	})
// })
// app.post('/records/:id', (req, res) => {
// 	//res.send('modify record')
// 	Record.findById(req.params.id, (err, record) => {
// 		record.name = req.body.name,
// 		record.date = req.body.date,
// 		record.category = req.body.category,
// 		record.amount = req.body.amount
// 		console.log('req.params.id', req.params.id)
// 		record.save((err) => {
// 			return res.redirect('/')
// 		})
// 	})
// })

// //show record
// // app.get('/records/:id', (req,res) =>{
// // 	res.send('display record info.')
	
// // })

// //delete record
// app.post('/records/:id/delete', ( req, res ) =>{
// 	//res.send('delete record')
// 	Record.findOne({ _id: req.params.id }, (err, record) =>{
// 		console.log('req.param.id', req.param.id)
// 		if(err) return console.error(err)
// 		  record.remove(err =>{
// 				if(err) return console.error(err)
// 				  return res.redirect('/')
// 			})
// 	})
// })


// //filter Records
// app.get('/filter', (req, res) => {

// 	Record.find((err, records) => {
// 		const month = req.query.month
// 		const keyword = req.query.category
// 		let totalAmount = 0
// 		if (err) return console.error(err)

// 		const recordSearch = records.filter(({ month, category }) => {
// 			if (keyword == 'all'){
// 				return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) }})
// 			}		
// 			return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) }} && category.includes(keyword))
// 		})
		
// 		for (let i = 0; i < recordSearch.length; i++){		
// 			totalAmount += parseInt(recordSearch[i].amount)
// 		}
// 		return res.render('index', { records: recordSearch, totalAmount: totalAmount  })
//   })
// })

app.listen(2130, () =>{
	console.log('app is running on localhost:2130!!')
})
