// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
require('../handlebarsHelper')
let totalAmount = 0


//record首頁
router.get('/', authenticated, (req, res) =>{

	const filteredMonth = 7 
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
		
		return res.render('index', { 
			records : records, 
			totalAmount : totalAmount,
			filteredMonth : filteredMonth
		})
	})
})

//filter Records
router.get('/filter', authenticated, (req, res) => {
	let totalAmount = 0
	const filteredMonth =  parseInt(req.query.month)
	const filteredCategory = req.query.category
	
	Record.find({ userID: req.user._id }, (err, records) => {
		
		if (err) return console.error(err)

		const recordSearch = records.filter(({ date, category }) => {
			
			if (filteredCategory === 'all' && date.getMonth()+1 === filteredMonth){
				return date.getMonth(filteredMonth)	
			}	
			
			return (date.getMonth(filteredMonth) && category.includes(filteredCategory))
		})
		
		console.log('recordSearch', recordSearch)
		if(totalAmount === 0){
      for (let i = 0; i < recordSearch.length; i++){		
			totalAmount += parseInt(recordSearch[i].amount)
		  }
		}
		
		return res.render('index', { 
			records: recordSearch, 
			totalAmount: totalAmount, 
			filteredCategory : filteredCategory, filteredMonth : filteredMonth  })
  })
})

module.exports = router