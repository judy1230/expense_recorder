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
				 totalAmount = getAmount(records)
				 chartData = getCategoryItem(records)
				 chartData = chartData.map(Element => Element / totalAmount * 100)
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
						chartData = getCategoryItem(records)
						chartData = chartData.map(Element => Element / totalAmount * 100)
						return res.render('index', {
							records: records,
							totalAmount: totalAmount,
							filteredMonth: filteredMonth,
							chartData: chartData
						})
					}).catch((error) => { return res.status(422).json(error) })
				}
	  	} catch (err) {
		  	console.log(err)
		}	
	}				
}


