// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
//const { getChart } = require('../config/chart.js')
require('../handlebarsHelper')



//record首頁
router.get('/', authenticated, (req, res) =>{
	req.flash('success_msg','welcome! 你已成功登入')
	let totalAmount = 0
	let valueOfHomeProperty = 0
	let valueOfTraffic = 0
	let valueOfEntertainment = 0
	let valueOfFood = 0
	let valueOfOthers = 0
	let filteredMonth = new Date().getMonth()+1

	Record.find({ userID: req.user._id }, (err, records) => {
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

		if (err) return console.error(err)
		if (totalAmount == 0) {

			for (let i = 0; i < recordsPresent.length; i++) {

				totalAmount += parseInt(recordsPresent[i].amount)

			}
			for (let j = 0; j < chartDataHomeProperty.length; j++) {

				valueOfHomeProperty += (chartDataHomeProperty[j].amount) / totalAmount * 100
				valueOfHomeProperty = Math.round(valueOfHomeProperty) - 1

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
		console.log('totalAmount', totalAmount)
		let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
		console.log('chartData', chartData)
		  res.render('index', {
			records: recordsPresent,
			totalAmount: totalAmount,
			filteredMonth: filteredMonth,
			chartData: chartData
		})
	})
		.sort({ date: 1 })
		.exec((err) => {			
			if (err) return console.error(err)
		})
})

//filter Records
router.get('/filter', authenticated, (req, res) => {
	let totalAmount = 0
	let valueOfHomeProperty = 0
	let valueOfTraffic = 0
	let valueOfEntertainment = 0
	let valueOfFood = 0 
	let valueOfOthers = 0
	const filteredMonth =  parseInt(req.query.month)
	const filteredCategory = req.query.category
	console.log('filteredMonth', filteredMonth)
	console.log('filteredCategory', filteredCategory)
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
		//console.log('recordSearch', recordSearch)
		const chartDataHomeProperty = recordSearch.filter(({ date, category }) => {	
				return category.includes('homeProperty')	
		})
		console.log('chartDataHomeProperty', chartDataHomeProperty)
		
		const chartDataTraffic = recordSearch.filter(({ date, category }) => {
				return category.includes('traffic')	
		})

		const chartDateEntertainment = recordSearch.filter(({ date, category }) => {
				return category.includes('entertainment')
		})

		const chartDataFood = recordSearch.filter(({ date, category }) => {
						return category.includes('food')
		})

		const chartDataOthers = recordSearch.filter(({ date, category }) => {
				return category.includes('others')
		})
				
		if (totalAmount  == 0) {
			for (let i = 0; i < recordSearch.length; i++) {
				totalAmount += parseInt(recordSearch[i].amount)
			}		
			for (let i = 0; i < chartDataHomeProperty.length; i++) {			
				valueOfHomeProperty += (chartDataHomeProperty[i].amount) 
				valueOfHomeProperty = Math.round(valueOfHomeProperty) / totalAmount * 100
				if (valueOfHomeProperty > 100) {
					valueOfHomeProperty = 100
				}
			}
			for (let i = 0; i < chartDataTraffic.length; i++) {
				valueOfTraffic += (chartDataTraffic[i].amount) / totalAmount * 100
				valueOfTraffic = Math.round(valueOfTraffic)
				if (valueOfTraffic > 100) {
					valueOfTraffic = 100
				}
			}
			for (let i = 0; i < chartDateEntertainment.length; i++) {
				valueOfEntertainment += (chartDateEntertainment[i].amount) / totalAmount * 100
				valueOfEntertainment = Math.round(valueOfEntertainment)
				if (valueOfEntertainment > 100) {
					valueOfEntertainment = 100
				}
			}
			for (let i = 0; i < chartDataFood.length; i++) {
				valueOfFood += (chartDataFood[i].amount) / totalAmount * 100
				valueOfFood = Math.round(valueOfFood)
				if (valueOfFood > 100) {
					valueOfFood = 100
				}
			}	
			for (let i = 0; i < chartDataOthers.length; i++) {
				valueOfOthers += (chartDataOthers[i].amount) / totalAmount * 100
				valueOfOthers = Math.round(valueOfOthers)
				if (valueOfOthers > 100) {
					valueOfOthers = 100
				}
			}
		}	

		let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
		console.log('chartData', chartData)
		return res.render('index', { 
			records: recordSearch, 
			totalAmount: totalAmount, 
			filteredCategory : filteredCategory,
			filteredMonth : filteredMonth,
		  chartData: chartData })
  })
})

module.exports = router