// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
let totalAmount = 0
// // restaurant 首頁
// router.get('/', authenticated, (req, res) => {
	
// 	req.flash('success_msg', `Welcome! ${req.user.name} 你已成功登入`)
// 	Restaurant.find({ userID: req.user._id })
// 	  .sort({ name: 'asc' })
// 		.exec((err, restaurants) => {
// 			if (err) return console.error(err)
// 			return res.render('index', { restaurants: restaurants })
// 		})
	
	
// })

//record首頁
router.get('/', authenticated, (req, res) =>{
	req.flash('success_msg','welcom! 你已成功登入')
	Record.find({ userID: req.user._id })
	.sort({date : 1})
	.exec((err, records) =>{
		console.log('records',records)
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
	Record.find((err, records) => {
		const month = req.query.month
		const keyword = req.query.category
		
		if (err) return console.error(err)

		const recordSearch = records.filter(({ month, category }) => {
			if (keyword == 'all'){
				return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) }})
			}		
			return ({ "ct": { $gte: new Date(2019, month, 1), $lt: new Date(2019, month, 31) }} && category.includes(keyword))
		})
		
		if(totalAmount == 0){
      for (let i = 0; i < recordSearch.length; i++){		
			totalAmount += parseInt(recordSearch[i].amount)
		  }
		}
		
		return res.render('index', { records: recordSearch, totalAmount: totalAmount  })
  })
})
module.exports = router