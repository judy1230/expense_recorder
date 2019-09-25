const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Record = require('./models/record.js')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
require('handlebars')
require('./handlebarsHelper.js')
//require('./routes/chart.js')

if (process.env.NODE_ENV !== 'production') {      // 如果不是 production 模式
	require('dotenv').config()                      // 使用 dotenv 讀取 .env 檔案
}

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
	//res.locals.recordSearch = req.recordSearch
	next()
})

app.use('/', require('./routes/home.js'))
//app.use('/filter', require('./routes/filterRecords.js'))
app.use('/records', require('./routes/records.js'))
app.use('/users', require('./routes/users.js'))
app.use('/auth', require('./routes/auths.js'))




app.listen(2500, () =>{
	console.log('app is running on localhost:2500!!')
})
