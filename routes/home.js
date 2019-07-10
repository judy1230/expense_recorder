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
	filteredMonth = 7
	Record.find({ userID: req.user._id }, (err, records) =>{
		const recordNow = records.filter(({ date}) => {
			return date.getMonth(filteredMonth)	
		})
	})
	  .sort({date : 1})
		.exec((err, recordNow) =>{
		//console.log('records',records)
		if(err) return console.error(err)
		if (totalAmount == 0){
			for (let i = 0; i < recordNow.length; i++){		
				totalAmount += parseInt(recordNow[i].amount)
		  }
		}
		let chartData = [10,20,40,15,15]
    //res.type('image/png')
	  res.render('index', { 
			records: recordNow, 
			totalAmount : totalAmount,
			filteredMonth :  filteredMonth,
			chartData : chartData
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
			if (filteredCategory !== 'all' && date.getMonth() + 1 === filteredMonth) {
				return  category.includes(filteredCategory)
			}	
		})
		
		if(totalAmount === 0){
      for (let i = 0; i < recordSearch.length; i++){		
			totalAmount += parseInt(recordSearch[i].amount)
		  }
		}
		
		return res.render('index', { 
			records: recordSearch, 
			totalAmount: totalAmount, 
			filteredCategory : filteredCategory,
			filteredMonth : filteredMonth  })
  })
})

module.exports = router