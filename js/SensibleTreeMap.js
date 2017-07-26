// const $ = require('jquery');
// window.$ = $;
// const d3 = require('d3');

function SensibleTreeMap( options ) {
  var self = this;
  extend = require('extend');

  var defaults = {
    sel: '#chart',
    width: 960,
    height: 500,
    color: d3.scale.category20c()
  }

  self = extend(self, defaults)
  self = extend(self, options)

  console.log('Creating treemap..')
  var theTreeMap = d3.layout.treemap()
    .size(this.width, this.height)
    .sticky(true)
    .value(function(d) {return d.size })

  var div = d3.select(this.sel).append('div')
    .style("position", "relative")
    .style("width", this.width + "px")
    .style("height", this.height + "px");

  var data = {
    name: "tree",
    children: [
      {
        name: "Monitor Dashboard",
        size: 16000,
        children: {
          name: "Frequently Resources",
          size: 8000
        }
      },
        { name: "animate makes things fun", size: 8000 },
        { name: "data data everywhere...", size: 5220 },
        { name: "display something beautiful", size: 3623 }
      ]
    }

  div.data([data]).selectAll('div')
    .data(theTreeMap.nodes)
    .enter().append('div')
    // .attr('class', 'cell')
    .style('border', 'solid 1px white')
    .style('overflow', 'hidden')
    .style('font', '10px sans-serif')
    .style('line-height', '12px')
    .style('position', 'absolute')
    .style('text-indent', '2px')
    .attr("name", function(d) {
      return d.name;
    } )
    .attr("name", function(d) {
      return d.name;
    } )
    .style("background", function(d) {
      return d.children ? self.color(d.name) : null;
    } )
    .attr({x: 8, y:8})
    .attr('x', 7)
    .call(cell)
    .text(function(d) { return d.children ? null : d.name; });

  // div.selectAll("div").data(theTreeMap.value(function(d) { return d.size; })).call(cell)

  function cell() {
     this.style("left", function(d) {
       console.log('Creating cell..', d.x);
       return d.x + "px";
     })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return d.dx - 1 + "px"; })
      .style("height", function(d) { return d.dy - 1 + "px"; });
   }

   return this;
}

module.exports = SensibleTreeMap
