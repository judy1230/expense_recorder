const db = require('../models')
const Record = db.Record
const User = db.User
const { getAmount } = require('../config/genAmount.js')
const { getCategoryItem } = require('../config/getCategoryItem.js')
const { Op } = require('sequelize')
module.exports = {	
	getChart: async(req, res) => {
		let totalAmount = 0
		const filteredMonth = parseInt(req.query.month)
		const filteredCategory = req.query.category
		try{

			if (filteredCategory !== 'all'){
	      await User.findByPk(req.user.id)
		      .then((user) => {
			    if (!user) throw new Error("user not found")
			    return Record.findAll({
						raw: true,
				    where: {
					  UserId: req.user.id,
					  date: {
						  [Op.between]: [`2019-0${filteredMonth}-01`, `2019-0${filteredMonth}-30`]
						},
						category: filteredCategory
				  }
			  })
	  	})
		   .then((records) => {
				 //console.log('records', records)
				 //totalAmount = Amount(records)
				 totalAmount = getAmount(records)
				 console.log('totalAmount', totalAmount)
				 chartData = getCategoryItem(records)
				 chartData = chartData.map(Element => Element / totalAmount * 100)
				 console.log('chartData', chartData)
			    return res.render('index', {
				    records: records,
			    	totalAmount: totalAmount,
				    filteredMonth: filteredMonth,
			    	chartData: chartData
		    	})
				  }).catch((error) => { return res.status(422).json(error) })
			} else {
				await User.findByPk(req.user.id)
					.then((user) => {
						if (!user) throw new Error("user not found")
						return Record.findAll({
							where: {
								UserId: req.user.id,
								date: {
									[Op.between]: [`2019-0${filteredMonth}-01`, `2019-0${filteredMonth}-30`]
								}
							}
						})
					})
					.then((records) => {
						totalAmount = getAmount(records)
						console.log('totalAmount', totalAmount)
						chartData = getCategoryItem(records)
						chartData = chartData.map(Element => Element / totalAmount * 100)
						console.log('chartData', chartData)
						return res.render('index', {
							records: records,
							totalAmount: totalAmount,
							filteredMonth: filteredMonth,
							chartData: chartData
						})
					}).catch((error) => { return res.status(422).json(error) })
			}

			// function Amount(array) {
			// 	array.forEach((item) =>
			// 		totalAmount += parseInt(item.amount))
			// 	return totalAmount
			// }

			// function getCategoryItem(data) {
			// 	let chartData = []
			// 	let categoryItemArray = ['homeProperty', 'traffic', 'entertainment', 'food', 'others']
			// 	categoryItemArray.forEach(function (items) {
			// 		const chartDataPerItem = data.filter(({ category }) => {
			// 			return category.includes(items)
			// 		})
			// 		if (Array.isArray(chartDataPerItem) && chartDataPerItem.length) {
			// 			chartDataPerItem.forEach((item) => {
			// 				itemsPerValue += parseInt(item.amount)
			// 				itemsPerValue = Math.round(itemsPerValue / totalAmount * 100)
			// 			})
			// 		} else {
			// 			itemsPerValue = 0
			// 		}
			// 		chartData.push(itemsPerValue)
			// 	})
			// 	return chartData
			// }
		} catch (err) {
			console.log(err)
		}	
	}				
}


