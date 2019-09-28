module.exports = {
	getCategoryItem: records => {
		let chartData = []
		let categoryItemArray = ['homeProperty', 'traffic', 'entertainment', 'food', 'others']
		let itemsPerValue = 0
		categoryItemArray.forEach(function (items) {
			const chartDataPerItem = records.filter(({ category }) => {
				return category.includes(items)
			})
			if (chartDataPerItem.length > 0)  {
				//console.log('////////hello, it is running in getCategoryItem!///////')
				chartDataPerItem.forEach(function (item) {
					itemsPerValue += parseInt(item.amount)
				})
			} else {
				itemsPerValue = 0
			}
			chartData.push(itemsPerValue)
		})
		return chartData
	}
}