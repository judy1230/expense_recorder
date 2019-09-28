const db = require('../models')
const Record = db.Record

module.exports = {
	
	getChart: async(req, res) => {
		let totalAmount = 0
		let itemsPerValue = 0
		const filteredMonth = parseInt(req.query.month)
		const filteredCategory = req.query.category
		try{
			if (filteredCategory !== 'all'){
				const recordsDisplay = await Record.findAll({
					where:{
					UserId: req.user._id, 
					date: {
					$gte: `2019-0${filteredMonth}-01`,
					$lt:  `2019-0${filteredMonth}-31`},
					category: filteredCategory
					}
				}).catch((error) => { return res.status(422).json(error) })  
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
				const recordsDisplay = await Record.findAll({
					UserId: req.user._id,
					 date: {
						$gte: `2019-0${filteredMonth}-01`,
						$lt:  `2019-0${filteredMonth}-31`}
				}).catch((error) => { return res.status(422).json(error) })  
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
					totalAmount += parseInt(item.amount))
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


