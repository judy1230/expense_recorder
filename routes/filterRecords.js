// routes/home.js
const express = require('express')
const router = express.Router()
//const Record = require('../models/record.js')
const { authenticated } = require('../config/auth.js')
//require('../handlebarsHelper')
const { getChart } = require('../config/chart.js')
//const { getHome } = require('../config/getHome.js')


//filter Records
//router.get('/filter', authenticated, getChart)

module.exports = router