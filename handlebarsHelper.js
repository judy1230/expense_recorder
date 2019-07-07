const Handlebars = require('handlebars')

Handlebars.registerHelper('ifcategoryicon', function (context, options) {
	console.log('this.category',this.category)
	if(this.category === 'homeProperty'){
    return options.fn({ categoryimage: 'home'})
	}
	if(this.category === 'traffic'){
    return options.fn({ categoryimage: 'shuttle-van'})
	}
	if(this.category === 'entertainment'){
    return options.fn({ categoryimage: 'grin-beam'})
	}
	if(this.category === 'food'){
    return options.fn({ categoryimage: 'utensils'})
	}
  if(this.category === 'others'){
    return options.fn({ categoryimage: 'pen'})
	}
})

Handlebars.registerHelper('ifdate', function (context, options) {
  let month = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Octr",
    "Nov", "Dec"
  ];

  let day = this.date.getDate();
  let monthIndex = this.date.getMonth();
  let year = this.date.getFullYear();
	deteContent = day + '/' + month[monthIndex] + '/' + year
	console.log(day + '/' + month[monthIndex] + '/' + year) 
	
  return options.fn({date: deteContent})
})