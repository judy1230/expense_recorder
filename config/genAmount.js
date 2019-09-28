module.exports = {
	getAmount: records => {
		let totalAmount = 0
		records.forEach(function (element) {
			//console.log('element.amount', element.amount)
			totalAmount += parseInt(element.amount)
		})	
		return totalAmount
	}
}