const Record = require('../models/record.js')

module.exports = {
	
	getChart: async(req, res) => {
		
		try{

			let totalAmount = 0
			let valueOfHomeProperty = 0
			let valueOfTraffic = 0
			let valueOfEntertainment = 0
			let valueOfFood = 0
			let valueOfOthers = 0
			const filteredMonth = parseInt(req.query.month)
			const filteredCategory = req.query.category
			console.log('filteredMonth in chartjs', filteredMonth)
			const recordsDisplay = await Record.find({
				userID: req.user._id, date: {
					$gte: `2019-0${filteredMonth}-01T12:11:28.774+00:00`,
					$lt: `2019-0${filteredMonth + 1}-01T12:11:28.774+00:00`
				}
			})
			//console.log('recordsDisplay in chart', recordsDisplay  )
			const recordSearch = recordsDisplay.filter(({ category }) => {
				if (filteredCategory === 'all' ) {
					return recordsDisplay
				}
				if (filteredCategory !== 'all') {
					return category.includes(filteredCategory)
				}
			})
			//console.log('recordSearch in chartjs', recordSearch)
			const chartDataHomeProperty = await recordSearch.filter(({ date, category }) => {
				return category.includes('homeProperty')
			})

			const chartDataTraffic = await recordSearch.filter(({ date, category }) => {
				return category.includes('traffic')
			})

			const chartDateEntertainment = await recordSearch.filter(({ date, category }) => {
				return category.includes('entertainment')
			})

			const chartDataFood = recordSearch.filter(({ date, category }) => {
				return category.includes('food')
			})

			const chartDataOthers = await recordSearch.filter(({ date, category }) => {
				return category.includes('others')
			})
			if (totalAmount == 0) {
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

				let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
				console.log('chartData', chartData)
				res.render('index', {
					records: recordSearch,
					totalAmount: totalAmount,
					filteredCategory: filteredCategory,
					filteredMonth: filteredMonth,
					chartData: chartData
				})
			} 
    		
		} catch (err) {
			console.log(err)
		}
	//	return next()
	}		
		
	}


