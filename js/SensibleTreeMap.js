const d3 = require('d3');
const extend = require('extend');

function SensibleTreeMap( options ) {
  var self = this;

  var defaults = {
    sel: 'body',
    width: 960,
    height: 500,
    data: {
      "name": "A1",
      "children": [
        {
          "name": "B1",
          "children": [
            {
              "name": "C1",
              "value": 100
            },
            {
              "name": "C2",
              "value": 300
            },
            {
              "name": "C3",
              "value": 200
            }
          ]
        },
        {
          "name": "B2",
          "value": 200
        }
      ]
    }
  }

  self = extend(self, defaults)
  self = extend(self, options)

  d3.select(this.sel).append('svg')
    .attr('width',this.width)
    .attr('height',this.height)
    .append('g')

  var partitionLayout = d3.partition()
    .size([this.width, this.height]);

  var rootNode = d3.hierarchy(this.data)

  rootNode.sum(function(d) {
    return d.value;
  });

  partitionLayout(rootNode);

  var nodes = d3.select(this.sel).select('svg g')
    .selectAll('g')
    .data(rootNode.descendants())
    .enter()
    .append('g')
    .attr('transform', function(d) {return 'translate(' + [d.y0, d.x0] + ')'})

  nodes
    .append('rect')
    .attr('fill', '#333')
    .attr('stroke', 'white')
    .attr('width', function(d) { return d.y1 - d.y0; })
    .attr('height', function(d) { return d.x1 - d.x0; })

  nodes
    .append('text')
    .attr('dx', 4)
    .attr('dy', 14)
    .attr('fill', 'white')
    .text(function(d) {
      return d.data.name;
    })

  return this;
}

module.exports = SensibleTreeMap
