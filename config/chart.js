const Record = require('../models/record.js')

module.exports = {
	
	getChart: async(req, res) => {
		let totalAmount = 0
		let itemsPerValue = 0
		const filteredMonth = parseInt(req.query.month)
		const filteredCategory = req.query.category
		
		try{
			

			if (filteredCategory !== 'all'){
				const recordsDisplay = await Record.find({
					userID: req.user._id, date: {
					$gte: `2019-0${filteredMonth}-01T12:11:28.774+00:00`,
					$lt: `2019-0${filteredMonth + 1}-01T12:11:28.774+00:00`},
					category: filteredCategory
				})
				totalAmount = Amount(recordsDisplay)
				chartData = getCategoryItem(recordsDisplay)
				res.render('index', {
					records: recordsDisplay,
					totalAmount: totalAmount,
					filteredCategory: filteredCategory,
					filteredMonth: filteredMonth,
					chartData: chartData
				})	
			} else {
				const recordsDisplay = await Record.find({
					userID: req.user._id, date: {
						$gte: `2019-0${filteredMonth}-01T12:11:28.774+00:00`,
						$lt: `2019-0${filteredMonth + 1}-01T12:11:28.774+00:00`}
				})
				totalAmount = Amount(recordsDisplay)
				chartData = getCategoryItem(recordsDisplay)
				res.render('index', {
					records: recordsDisplay,
					totalAmount: totalAmount,
					filteredCategory: filteredCategory,
					filteredMonth: filteredMonth,
					chartData: chartData
				})
			}

			function Amount(array) {
				array.forEach((item) =>
					totalAmount += parseInt(item.amount)
				)
				return totalAmount
			}

			function getCategoryItem(data) {
				let chartData = []
				let categoryItemArray = ['homeProperty', 'traffic', 'entertainment', 'food', 'others']
				categoryItemArray.forEach(function (items) {
					const chartDataPerItem = data.filter(({ category }) => {
						return category.includes(items)
					})
					if (Array.isArray(chartDataPerItem) && chartDataPerItem.length) {
						chartDataPerItem.forEach((item) => {
							itemsPerValue += parseInt(item.amount)
							itemsPerValue = Math.round(itemsPerValue / totalAmount * 100)
						})
					} else {
						itemsPerValue = 0
					}
					chartData.push(itemsPerValue)
				})
				return chartData
			}
			
		} catch (err) {
			console.log(err)
		}	
	}				
}


