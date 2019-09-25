const Record = require('../models/record.js')


module.exports = {

  getHome: async(req, res) => {
		
		try{
			
			let totalAmount = 0
			let valueOfHomeProperty = 0
			let valueOfTraffic = 0
			let valueOfEntertainment = 0
			let valueOfFood = 0
			let valueOfOthers = 0
			//let filteredMonth = new Date().getMonth() + 1
			let filteredMonth = 8
			const recordsDisplay = await Record.find({
				userID: req.user._id, date: {
					$gte: `2019-0${filteredMonth}-31T12:11:28.774+00:00`,
					$lt: `2019-0${filteredMonth+1}-31T12:11:28.774+00:00`}})
		
			//display default /home page records of month
			// Record.find({ userID: req.user._id }, (err, records) => {
			// 	if (err) return console.error(err)
			// 	const recordsDisplay = records.filter(({ date }) => {
			// 		if (date.getMonth() + 1 === filteredMonth) {
			// 			return date.getMonth(filteredMonth)
			// 		}
			// 	})
			console.log('recordsDisplay', recordsDisplay)
			const chartDataHomeProperty = recordsDisplay.filter(({ category }) => {

				return category.includes('homeProperty')

			})

			const chartDataTraffic = recordsDisplay.filter(({ date, category }) => {

				return category.includes('traffic')

			})

			const chartDateEntertainment = recordsDisplay.filter(({ date, category }) => {

				return category.includes('entertainment')

			})

			const chartDataFood = recordsDisplay.filter(({ date, category }) => {

				return category.includes('food')

			})

			const chartDataOthers = recordsDisplay.filter(({ date, category }) => {

				return category.includes('others')

			})

			//if (err) return console.error(err)
			if (totalAmount == 0) {
				for (let i = 0; i < recordsDisplay.length; i++) {
					totalAmount += parseInt(recordsDisplay[i].amount)
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

			let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
			console.log('chartData in gethome.js', chartData)

			res.render('index', {
				records: recordsDisplay,
				totalAmount: totalAmount,
				filteredMonth: filteredMonth,
				chartData: chartData
			})
		} catch (err) {
			return console.log(err)
		}
		
		//return next()		
   
	}
}	