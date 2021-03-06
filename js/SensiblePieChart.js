const $ = require('jquery');
window.$ = $;
const c3 = require('c3');

function SensiblePieChart( options ) {
  var self = this;

  var defaults = {
    target: $(document.body),
    data: ['Visitors', 100],
    // data: {
    //   'root': [['Visitors', 100]],
    //   'Visitors': [['Mobile', 75],['Desktop', 24]],
    //   'Desktop': [['Windows', 75],['Mac', 24], ['Other', 1]]
    // },
    colors: ['#FF0000', '#00FF00', '#0000FF']
  }

  var drillDownPath = ['root'];

  var currentLayer = 'root';

  $.extend(self, defaults, options)

  this.chart = c3.generate({
    bindto: self.target[0],
    data: {
      columns: [],
      type : 'pie',
      colors: self.colors,
      onclick: function (d, i) {
        if (typeof self.data === 'object' && self.data.hasOwnProperty(d.id)) {
          console.log('Attempting to drill down to: ' + d.id);
          self.drilldown(d.id)
        }
      },
      onmouseover: function (d, i) {  },
      onmouseout: function (d, i) {  }
    }
  });

  this.drilldown = function(label) {
    if (typeof self.data[label] === 'undefined') {
      console.log('No layer under this one.')
      return;
    }

    console.log('Drilling down to ' + label + ' layer.')
    console.log('Columns are now: ', self.data[label])

    drillDownPath.push(label)

    var dataToUnload = []
    for (var i in self.data[currentLayer]) {
      dataToUnload.push(self.data[currentLayer][i][0])
    }
    console.log('Unloading..', dataToUnload)

    this.chart.load({
      unload: dataToUnload,
      columns: this.data[label]
    });

    //Create a color object for C3
    var newColors = {}
    // Just cycle through the colors.
    var currentColor = -1;
    function nextColor() {
      // if you go beyond the index...
      if (self.colors[currentColor] === undefined ) {
        // ...reset it to zero
        currentColor = 0;
      }
      return self.colors[currentColor++];
    }
    // Get the keys of the data.
    for( var i in this.data[label]) {
      newColors[this.data[label][i][0]] = nextColor();
    }

    console.log('Setting colors like so:', newColors)
    this.chart.data.colors(newColors)

    currentLayer = label;
  }

  this.up = function() {
    console.log('Going up.')
    self.drilldown(drillDownPath[drillDownPath.length-2]);
  }

  this.target.on('contextmenu', this.up);

  // Load the data if the data is an array
  if (Array.isArray(this.data)) {
    this.chart.load({
      columns: [
        this.data
      ]
    });
  }
  else if (typeof this.data === 'object') {
    this.drilldown('root');
  }

  return this;
}

window.SensiblePieChart = SensiblePieChart;
module.exports = SensiblePieChart;
