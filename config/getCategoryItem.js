module.exports = {
	getCategoryItem: records => {
		let chartData = []
		let categoryItemArray = ['homeProperty', 'traffic', 'entertainment', 'food', 'others']
		let itemsPerValue = 0
		categoryItemArray.forEach(function (items) {
			const chartDataPerItem = records.filter(({ category }) => {
				return category.includes(items)
			})
			console.log('chartDataPerItem', chartDataPerItem)
			console.log('chartDataPerItem.ength', chartDataPerItem.length)
			if (chartDataPerItem.length > 0) {
				console.log('hello')
				chartDataPerItem.forEach(function (item) {
					console.log('items.amount', item.amount)
					itemsPerValue += parseInt(item.amount)
					console.log('itemsPerValue', itemsPerValue)
					// itemsPerValue
					// itemsPerValue = Math.round(itemsPerValue / totalAmount * 100)
					// console.log('itemsPerValue', itemsPerValue)
				})
			} else {
				itemsPerValue = 0
			}
			chartData.push(itemsPerValue)
			console.log('chartData', chartData)
		})
		return chartData
	}
}