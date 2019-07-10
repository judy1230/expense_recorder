// routes/home.js
const express = require('express')
const router = express.Router()
const Record= require('../models/record.js')
const { authenticated } = require('../config/auth.js')
require('../handlebarsHelper')
const { CanvasRenderService } = require('chartjs-node-canvas');
let totalAmount = 0
Handlebars = require('handlebars')
const ChartJs = require('chart.js');
const { createCanvas } = require('canvas');
var labels = ['高興', '難過'];
const configuration = {
	type: 'pie',
	data: {
		labels: labels,
		datasets: [{
			//預設資料
			data: [10, 90],
			backgroundColor: [
				//資料顏色
				"#00A1FF",
				"#FF0004"
			],
		}],
	}
};

const chartCallback = (ChartJS) => {

	// Global config example: https://www.chartjs.org/docs/latest/configuration/
	ChartJS.defaults.global.elements.rectangle.borderWidth = 2;
	// Global plugin example: https://www.chartjs.org/docs/latest/developers/plugins.html
	ChartJS.plugins.register({
		// plugin implementation
	});
	// New chart type example: https://www.chartjs.org/docs/latest/developers/charts.html
	ChartJS.controllers.MyType = ChartJS.DatasetController.extend({
		
	});
};
function renderPNG(configuration) {

	const canvas = createCanvas(200, 200);
	// Disable animation (otherwise charts will throw exceptions)
	configuration.options = configuration.options || {};
	configuration.options.responsive = false;
	configuration.options.animation = false;
	canvas.style = {};

	const context = canvas.getContext('2d');
	const canvasRenderService = new CanvasRenderService(200, 200);
	const stream = canvasRenderService.renderToStream(configuration);
	//chart = new ChartJs(context, configuration)
	console.log('image ', image )
	
	return new Promise((resolve, reject) => {
		// or `pngStream` `toDataURL`, etc
		stream.canvas.rendertoBuffer((error, buffer) => {
			if (error) {
				return reject(error);
			}
			return resolve(buffer);
		}).catch (error) 
	});
}
router.get('/chart', async (req, res, next) => {
	try {
		const canvasRenderService = new CanvasRenderService(200,200);
		const image = await canvasRenderService.renderToBuffer(configuration);
		console.log('image' , image)
		res.type('image/png');
		res.send(image);
	} catch (error) {
		next(error);
	}
});

//console.log('renderPNG(configuration)', renderPNG(configuration))
//record首頁
router.get('/', authenticated, (req, res) =>{
	
	req.flash('success_msg','welcome! 你已成功登入')
	
	const canvasRenderService = new CanvasRenderService(200, 200);
	const stream = canvasRenderService.renderToDataURL(configuration);
	//renderPNG(configuration)
	Record.find({ userID: req.user._id })
	.sort({date : 1})
	.exec((err, records) =>{
		//console.log('records',records)
		if(err) return console.error(err)
		if (totalAmount == 0){
      for (let i = 0; i < records.length; i++){		
			totalAmount += parseInt(records[i].amount)
		  }
		}
	
    //res.type('image/png')
	  res.render('index', { 
			records : records, 
			totalAmount : totalAmount,
			myChart: stream
		})
	})
})

//filter Records
router.get('/filter', authenticated, (req, res) => {
	let totalAmount = 0
	const filteredMonth =  parseInt(req.query.month)
	const filteredCategory = req.query.category
	
	Record.find({ userID: req.user._id }, (err, records) => {
		
		if (err) return console.error(err)
    
		const recordSearch = records.filter(({ date, category }) => {
			
			if (filteredCategory === 'all' && date.getMonth()+1 === filteredMonth){
				
				return date.getMonth(filteredMonth)	
			} 
			if (filteredCategory !== 'all' && date.getMonth() + 1 === filteredMonth) {
				return  category.includes(filteredCategory)
			}	
		})
		
		if(totalAmount === 0){
      for (let i = 0; i < recordSearch.length; i++){		
			totalAmount += parseInt(recordSearch[i].amount)
		  }
		}
		
		return res.render('index', { 
			records: recordSearch, 
			totalAmount: totalAmount, 
			filteredCategory : filteredCategory, filteredMonth : filteredMonth  })
  })
})

module.exports = router