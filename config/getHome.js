const Record = require('../models/record.js')


module.exports = {

  getHome: async(req, res) => {
		
		try{
			
			let totalAmount = 0
			let itemsPerValue = 0
			
			//let filteredMonth = new Date().getMonth() + 1
			let filteredMonth = 8
			const recordsDisplay = await Record.find({
				userID: req.user._id, date: {
					$gte: `2019-0${filteredMonth}-01T12:11:28.774+00:00`,
					$lt: `2019-0${filteredMonth+1}-01T12:11:28.774+00:00`}})
			recordsDisplay.forEach((item) =>
				totalAmount += parseInt(item.amount)  
			)
			
			let chartData = []
			let categoryItemArray = ['homeProperty', 'traffic', 'entertainment','food','others']

			categoryItemArray.forEach(function (items) {
				const chartDataPerItem = recordsDisplay.filter(({ category }) => {
					return category.includes(items)
				})
				chartDataPerItem.forEach((item) =>{
					itemsPerValue += parseInt(item.amount) 
					itemsPerValue = Math.round(itemsPerValue/totalAmount*100)
				})
				chartData.push(itemsPerValue)
			})
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
	}
}	