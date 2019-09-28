module.exports = {
	getAmount: records => {
		let totalAmount = 0
		records.forEach(function (element) {
			totalAmount += parseInt(element.amount)
		})	
		return totalAmount
	}
}