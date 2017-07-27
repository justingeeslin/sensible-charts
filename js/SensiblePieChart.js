const extend = require('extend');
const d3 = require('d3');
const d3pie = require('d3pie');

function SensiblePieChart( options ) {
  var self = this;

  var defaults = {
    sel: '#pie',
    data: {
  		content: [
  			{ label: "Chickens", value: 5 },
  			{ label: "Elephants", value: 8 },
  			{ label: "Java", value: 2 }
  		]
  	},
    // data: ['Visitors', 100],
    // data: {
    //   'root': [['Visitors', 100]],
    //   'Visitors': [['Mobile', 75],['Desktop', 24]],
    //   'Desktop': [['Windows', 75],['Mac', 24], ['Other', 1]]
    // },
    colors: ['#333', '#444', '#555'],
    effects: {
  		load: {
  			effect: "none"
  		}
  	}
  }

  self = extend(this, defaults)
  self = extend(this, options)

  // Transformed from the simplied object data layout (key-value pairs)
  if (typeof this.data === "object" && typeof this.data.content === "undefined") {
    var newData = {
      content: []
    }
    for(var i in this.data) {
      newData.content.push({ label: i, value: this.data[i]});
    }
    this.data = newData;
  }

  console.log('New data after simple object layout: ', this.data);

  //Augment data with colors
  var colorI = 0
  for( var i in this.data.content) {

    this.data.content[i].color = this.colors[colorI];

    colorI++;

    if (colorI >= this.colors.length) {
      colorI = 0;
    }
  }



  var pie = new d3pie(d3.select(this.sel).node(), this);

  return this;
}

module.exports = SensiblePieChart;
