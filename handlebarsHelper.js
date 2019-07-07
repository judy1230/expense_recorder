const Handlebars = require('handlebars')

Handlebars.registerHelper('if', function (context, options) {
	console.log('this.category',this.category)
	if(this.category === 'homeProperty'){
    return options.fn({ image: 'home'})
	}
	if(this.category === 'traffic'){
    return options.fn({ image: 'shuttle-van'})
	}
	if(this.category === 'entertainment'){
    return options.fn({ image: 'grin-beam'})
	}
	if(this.category === 'food'){
    return options.fn({ image: 'utensils'})
	}
  if(this.category === 'others'){
    return options.fn({ image: 'pen'})
	}
})