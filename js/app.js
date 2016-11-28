var data = d3.select("#test").html().trim();

data = d3.csvParse(data, function(d) {
  return {
    location_id:  +d.location_id,
    location:      d.location,
    location_name: d.location_name,
    year:         +d.year,
    age_group_id: +d.age_group_id,
    age_group:     d.age_group,
    age_start:    +d.age_start,
    age_end:      +d.age_end,
    sex_id:       +d.sex_id,
    sex:           d.sex,
    unit:          d.unit,
    metric:        d.metric,
    measure:       d.measure,
    mean:         +d.mean,
    lower:        +d.lower,
    upper:        +d. upper
  };
});

var width  = 1300;
var height = 700;

var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var chart = d3.select("svg"),
  margin  = {top: 20, right: 20, bottom: 180, left: 40},
  width   = +chart.attr("width") - margin.left - margin.right,
  height  = +chart.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height,0]);

var g = chart.append("g")
             .attr ("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) { return d.age_group}));
y.domain([0, d3.max(data, function(d) { return d.mean})]);

g.append("g")
 .attr("class", "axis axis--x")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x))
 .selectAll("text")
 .style("text-anchor", "end")
 .attr("dx", "-.8em")
 .attr("dy", ".15em")
 .attr("transform", "rotate(-30)")
 .append("text")
 .attr("text-anchor", "middle")
 .attr("x", (width/2))
 .attr("y", (height + margin.bottom))
 .text("Age Groups");

g.append("g")
 .attr("class", "axis axis--y")
 .call(d3.axisLeft(y).ticks(10,"%"))
 .append("text")
 .attr("transform", "rotate(-90)")
 .attr("text-anchor", "middle")
 .text("Prevalence");

g.selectAll(".bar")
 .data(data)
 .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) {return x(d.age_group);})
         .attr("y", function(d) {return y(d.mean);})
         .attr("width", x.bandwidth())
         .attr("height", function(d) {return height - y(d.mean);});
//
// var age_group = data.map(function(d) {
//   return d.age_group;
// });
//
// var prevalence = d3.max(data, function(d) {
//   return d.mean;
// });
//
// var margins = {
//   top: 350,
//   right: 10,
//   bottom: 50,
//   left: 110
// };
//
// var graphWidth = width - margins.right - margins.left;
// var graphHeight = height - margins.top - margins.bottom;
//
// var chart = svg.append('g')
//   .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
//
// var x_scale = d3.scale.ordinal()
//   .domain(age_group)
//   .rangeRoundBands([0, graphWidth], 0.1);
//
// var y_scale = d3.scale.linear()
//   .range([0,graphHeight])
//   .domain([0,prevalence]);
//
// var x_axis = d3.svg.axis()
//   .scale(x_scale)
//   .orient("bottom");
//
// chart.append("g")
//   .classed("x axis", true)
//   .call(x_axis);
//
// var bars = chart.selectAll('rect.bar')
//   .data(data);
//
// bars.enter()
//   .append('rect')
//   .attr('class', 'bar');
//
// bars.exit()
//   .remove();
//
// bars.attr('y_scale', 0)
//   .attr('x_scale', function(d) {
//     return x_scale(d.mean);
//   })
//   // .attr('height', y_scale.rangeBand())
//   .attr('width', function(d) {
//     return x_scale(d.age_group);
//   })
