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
    upper:        +d.upper
  };
});

var width  = 1300;
var height = 700;

var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height);

var chart = d3.select("svg"),
  margin  = {top: 20, right: 20, bottom: 100, left: 60},
  width   = +chart.attr("width") - margin.left - margin.right,
  height  = +chart.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height,0]);

var g = chart.append("g")
             .attr ("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(function(d) { return d.age_group; }));
y.domain([0, d3.max(data, function(d) { return d.mean; })]);

g.append("g")
 .attr("class", "axis axis --x")
 .attr("transform", "translate(0," + height + ")")
 .call(d3.axisBottom(x))
 .selectAll("text")
 .style("text-anchor", "end")
 .attr("dx", "-.8em")
 .attr("dy", ".15em")
 .attr("transform", "rotate(-30)");

chart.append("text")
     .style("text-anchor", "middle")
     .attr("x", width/2)
     .attr("y", height + margin.bottom)
     .text("Age Groups");

g.append("g")
 .attr("class", "axis axis --y")
 .call(d3.axisLeft(y).ticks(10,"%"));

chart.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0)
     .attr("x", 0 - (height / 2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text("Prevalence");

g.selectAll(".bar")
 .data(data)
 .enter().append("rect")
         .attr("class", "bar")
         .attr("id", function(d) { return d.sex + d.metric; })
         .attr("x", function(d) { return x(d.age_group); })
         .attr("y", function(d) { return y(d.mean); })
         .attr("width", x.bandwidth())
         .transition()
         .duration(1000)
         .delay(function(d,i) { return i*50; })
         .attr("height", function(d) { return height - y(d.mean); });
