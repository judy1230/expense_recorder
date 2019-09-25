const Record = require('../models/record.js')


module.exports = {

  getHome: async(req, res) => {
		
		try{
			
			let totalAmount = 0
			let itemsPerValue = 0
			// let valueOfHomeProperty = 0
			// let valueOfTraffic = 0
			// let valueOfEntertainment = 0
			// let valueOfFood = 0
			// let valueOfOthers = 0
			//let filteredMonth = new Date().getMonth() + 1
			let filteredMonth = 8
			const recordsDisplay = await Record.find({
				userID: req.user._id, date: {
					$gte: `2019-0${filteredMonth}-01T12:11:28.774+00:00`,
					$lt: `2019-0${filteredMonth+1}-01T12:11:28.774+00:00`}})
			recordsDisplay.forEach((item) =>
				//console.log('item.amount', item.amount)
				totalAmount += parseInt(item.amount)  
			)
			console.log('totalAmount', totalAmount)
		  	// for (let i = 0; i < recordsDisplay.length; i++) {
				// 	totalAmount += parseInt(recordsDisplay[i].amount)
				// }
			//display default /home page records of month
			// Record.find({ userID: req.user._id }, (err, records) => {
			// 	if (err) return console.error(err)
			// 	const recordsDisplay = records.filter(({ date }) => {
			// 		if (date.getMonth() + 1 === filteredMonth) {
			// 			return date.getMonth(filteredMonth)
			// 		}
			// 	})
			//console.log('recordsDisplay', recordsDisplay)
			let chartData = []
			let categoryItemArray = ['homeProperty', 'traffic', 'entertainment','food','others']

			categoryItemArray.forEach(function (items) {
				const chartDataPerItem = recordsDisplay.filter(({ category }) => {
					return category.includes(items)
				})
				console.log('chartDataPerItem', chartDataPerItem)
				// for (let j = 0; j < chartDataPerItem.length; j++) {
				// 	itemsPerValue += (chartDataPerItem[j].amount) / totalAmount * 100
				// 	itemsPerValue = Math.round(itemsPerValue)
				// }
				chartDataPerItem.forEach((item) =>{
					itemsPerValue += item.amount
					console.log('itemsPerValue', itemsPerValue)
					itemsPerValue = Math.round(itemsPerValue/totalAmount*100)
					
				})
				chartData.push(itemsPerValue)
				console.log('chartData', chartData)
			});
			// const chartDataPerItem = recordsDisplay.filter(({ category }) => {

			// 	return category.includes('homeProperty')

			// })

			// const chartDataHomeProperty = recordsDisplay.filter(({ category }) => {

			// 	return category.includes('homeProperty')

			// })

			// const chartDataTraffic = recordsDisplay.filter(({ date, category }) => {

			// 	return category.includes('traffic')

			// })

			// const chartDateEntertainment = recordsDisplay.filter(({ date, category }) => {

			// 	return category.includes('entertainment')

			// })

			// const chartDataFood = recordsDisplay.filter(({ date, category }) => {

			// 	return category.includes('food')

			// })

			// const chartDataOthers = recordsDisplay.filter(({ date, category }) => {

			// 	return category.includes('others')

			// })

			// //if (err) return console.error(err)
			// if (totalAmount == 0) {
			// 	for (let i = 0; i < recordsDisplay.length; i++) {
			// 		totalAmount += parseInt(recordsDisplay[i].amount)
			// 	}
			// 	for (let j = 0; j < chartDataHomeProperty.length; j++) {
			// 		valueOfHomeProperty += (chartDataHomeProperty[j].amount) / totalAmount * 100
			// 		valueOfHomeProperty = Math.round(valueOfHomeProperty) - 1
			// 	}
			// 	for (let k = 0; k < chartDataTraffic.length; k++) {
			// 		valueOfTraffic += (chartDataTraffic[k].amount) / totalAmount * 100
			// 		valueOfTraffic = Math.round(valueOfTraffic)
			// 	}
			// 	for (let i = 0; i < chartDateEntertainment.length; i++) {
			// 		valueOfEntertainment += (chartDateEntertainment[i].amount) / totalAmount * 100
			// 		valueOfEntertainment = Math.round(valueOfEntertainment)
			// 	}
			// 	for (let i = 0; i < chartDataFood.length; i++) {
			// 		valueOfFood += (chartDataFood[i].amount) / totalAmount * 100
			// 		valueOfFood = Math.round(valueOfFood)
			// 	}
			// 	for (let i = 0; i < chartDataOthers.length; i++) {
			// 		valueOfOthers += (chartDataOthers[i].amount) / totalAmount * 100
			// 		valueOfOthers = Math.round(valueOfOthers)
			// 	}
			// }

			// let chartData = [valueOfHomeProperty, valueOfTraffic, valueOfEntertainment, valueOfFood, valueOfOthers]
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