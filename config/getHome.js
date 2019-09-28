const db = require('../models')
const Record = db.Record
const User = db.User
const { Op } = require('sequelize')
module.exports = {

  getHome: async(req, res) => {		
		try{			
			let totalAmount = 0
			let itemsPerValue = 0
			let filteredMonth = new Date().getMonth() + 1
			let chartData = []
			let categoryItemArray = ['homeProperty', 'traffic', 'entertainment', 'food', 'others']

			const records = await User.findByPk(req.user.id)
			//User.findByPk(req.user.id)
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
					records.forEach((item) =>
						totalAmount += parseInt(item.amount))
					categoryItemArray.forEach(function (items) {
						const chartDataPerItem = records.filter(({ category }) => {
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
					return res.render('index', {
						records: records,
						totalAmount: totalAmount,
						filteredMonth: filteredMonth,
						chartData: chartData
					})	
			  }).catch((error) => { return res.status(422).json(error)}) 		
		  } catch(err) { return console.log(err)}
	}
}	