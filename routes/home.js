// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
require('../handlebarsHelper')
let totalAmount = 0


//record首頁
router.get('/', authenticated, (req, res) =>{
	
	req.flash('success_msg','welcome! 你已成功登入')
	Record.find({ userID: req.user._id })
	.sort({date : 1})
	.exec((err, records) =>{
		//console.log('records',records)
		if(err) return console.error(err)
		if (totalAmount == 0){
      for (let i = 0; i < records.length; i++){		
			totalAmount += parseInt(records[i].amount)
		  }
		}
		
		return res.render('index', { records : records, totalAmount : totalAmount})
	})
})

//filter Records
router.get('/filter', authenticated, (req, res) => {
	let totalAmount = 0
	const filteredMonth = req.query.month
	const filteredCategory = req.query.category
	console.log('filteredMonth', filteredMonth)
	console.log('filteredCategory', filteredCategory)
	
	Record.find({ userID: req.user._id }, (err, records) => {
		
		
		if (err) return console.error(err)

		const recordSearch = records.filter(({ filteredMonth, category }) => {
			if (filteredCategory === 'all'){
				
				return ({ "date": { $gte: new Date(2019, filteredMonth, 1), $lt: new Date(2019, filteredMonth, 31) }})
			}		
			return ({ "date": { $gte: new Date(2019, filteredMonth, 1), $lt: new Date(2019, filteredMonth, 31) } } && category.includes(filteredCategory))
		})
		
		if(totalAmount === 0){
      for (let i = 0; i < recordSearch.length; i++){		
			totalAmount += parseInt(recordSearch[i].amount)
		  }
		}
		
		return res.render('index', { records: recordSearch, totalAmount: totalAmount, filteredCategory : filteredCategory, filteredMonth : filteredMonth  })
  })
})

module.exports = router