// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
require('../handlebarsHelper')


//record首頁
router.get('/', authenticated, (req, res) =>{
	let totalAmount = 0
	let valueOfHomeProperty = 0
	let valueOfTraffic = 0
	let valueOfEntertainment = 0
	let valueOfFood = 0
	let valueOfOthers = 0
	
	req.flash('success_msg','welcome! 你已成功登入')
	let filteredMonth = 6
	
	Record.find({ userID: req.user._id }, (err, records) =>{
		if (err) return console.error(err)

		const recordsPresent = records.filter(({ date }) => {
			if (date.getMonth() + 1 === filteredMonth) {
				
				return date.getMonth(filteredMonth)
			} 
		
			
		})

		const chartDataHomeProperty = records.filter(({ date, category }) => {
			if (date.getMonth() + 1 === filteredMonth) {

				return category.includes('homeProperty')
			} 

		})

		const chartDataTraffic = records.filter(({ date, category }) => {
			if (date.getMonth() + 1 === filteredMonth) {

				return category.includes('traffic')
			}

		})

		const chartDateEntertainment = records.filter(({ date, category }) => {
			if (date.getMonth() + 1 === filteredMonth) {

				return category.includes('entertainment')
			}

		})

		const chartDataFood = records.filter(({ date, category }) => {
			if (date.getMonth() + 1 === filteredMonth) {

				return category.includes('food')
			}

		})

		const chartDataOthers = records.filter(({ date, category }) => {
			if (date.getMonth() + 1 === filteredMonth) {

				return category.includes('others')
			}

		})
		console.log('recordsPresent', recordsPresent)
		console.log('chartDataHomeProperty', chartDataHomeProperty)
		console.log('chartDataHomeProperty.length', chartDataHomeProperty.length)
		console.log('chartDataTraffic', chartDataTraffic)
		console.log('chartDataTraffic.length', chartDataTraffic.length)
		console.log('chartDateEntertainment', chartDateEntertainment)
		console.log('chartDateEntertainment.length', chartDateEntertainment.length)
		console.log('chartDataFood', chartDataFood)
		console.log('chartDataFood.length', chartDataFood.length)
		console.log(' chartDataOthers', chartDataOthers)
		console.log(' chartDataOthers.length', chartDataOthers.length)
		if (err) return console.error(err)
		if (totalAmount == 0) {
			console.log('chartDataHomeProperty', chartDataHomeProperty)
			for (let i = 0; i < recordsPresent.length; i++) {

				totalAmount += parseInt(recordsPresent[i].amount)
				//console.log('totalAmount', totalAmount)
			}
			for (let j = 0; j < chartDataHomeProperty.length; j++) {

				valueOfHomeProperty += (chartDataHomeProperty[j].amount)/totalAmount*100
				valueOfHomeProperty = Math.round(valueOfHomeProperty)-1

			}
			for (let k = 0; k < chartDataTraffic.length; k++) {

				valueOfTraffic += (chartDataTraffic[k].amount) / totalAmount * 100
				valueOfTraffic = Math.round(valueOfTraffic)
	
			}
			for (let i = 0; i < chartDateEntertainment.length; i++) {

				valueOfEntertainment += (chartDateEntertainment[i].amount) / totalAmount * 100
				valueOfEntertainment = Math.round(valueOfEntertainment)
			
			}
			for (let i = 0; i < chartDataFood.length; i++) {

				valueOfFood += (chartDataFood[i].amount) / totalAmount * 100
				valueOfFood = Math.round(valueOfFood)
			
			}
			for (let i = 0; i < chartDataOthers.length; i++) {

				valueOfOthers += (chartDataOthers[i].amount) / totalAmount * 100
				valueOfOthers = Math.round(valueOfOthers)
				
			}
		}
		totalvalue = valueOfOthers + valueOfFood + valueOfEntertainment + valueOfTraffic + valueOfHomeProperty
		console.log('valueOfOthers', valueOfOthers )
		console.log('valueOfFood', valueOfFood)
		console.log('valueOfEntertainment', valueOfEntertainment)
		console.log('valueOfTraffic', valueOfTraffic)
		console.log('valueOfHomeProperty', valueOfHomeProperty)
		console.log('totalvalue', totalvalue)
		let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
		console.log('chartData', chartData)
		//let chartData = [valueOfHomeProperty, 10, 10, 10, 10]
		res.render('index', {
			records: recordsPresent,
			totalAmount: totalAmount,
			filteredMonth: filteredMonth,
		})
		
	})
	  .sort({date : 1})
		.exec((err, recordsPresent, chartDataHomeProperty) =>{
			//console.log('recordsPresent', recordsPresent) 
			if (err) return console.error(err)
		

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