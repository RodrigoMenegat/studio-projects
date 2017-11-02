(function() {
  // Set values for the margins, height and width
  var margin = { top: 20, left: 100, right: 55, bottom: 60},
      height = 500 - margin.top - margin.bottom,
      width = 1000 - margin.left - margin.right;

  // Append a svg to the chart-1 div.
  var svg = d3.select("#chart-1")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // Setting the scales
  
  // The xPositionScale will take on the year and return a linear position from 0 to width
  // .domain will go from 10 (so we have space for the line in the last chart) to max messages, so it will be set later
  var xPositionScale = d3.scaleLinear()
    .range([10, width])

  // The yPositionScale is a bandScale that goes in descending sort order
  // .domain will also be set later, using d3.map() in the friend names
  var yPositionScale = d3.scaleBand()
    .range([0, height])

  // Now let's read the data in, with our usual MAGIC INVOCATION
  // "OH D3 OUR POWERFUL AND ALMIGHT OVERLORD, IN THY NAME I BRING THE DATA IN"
  d3.queue()
    .defer(d3.csv, "./data/friends.csv")
    .await(ready);

  function ready(error, datapoints) {
    // Before everything, let's finish setting our scales

    var maxMessages = d3.max(datapoints.map(function(d) {return d.message}))
    var allFriends = datapoints.map(function(d) { return d.friend })
    xPositionScale.domain([0, maxMessages])
    yPositionScale.domain(allFriends)
    console.log(datapoints)

    // Adding circles
    svg.selectAll(".circle-friend")
      .data(datapoints)
      .enter().append('circle')
      .attr("r", 5)
      .attr("fill","#DA546C")
      .attr("stroke","black")
      .attr("stroke-width",1.5)
      .attr("cy", function(d){
        return yPositionScale(d.friend)
      })
      .attr("cx", 0)
      .transition()
      .duration(1500)
      .attr("cx", function(d){
        return xPositionScale(d.message)
      })

  // Adding lines - note that I don't use the line generator because they are simple straight lines
  svg.selectAll(".line-friend")
    .data(datapoints)
    .enter().append("line")
    .attr("stroke","black")
    .attr("stroke-width",1.5)
    .attr("x1",0)
    .attr("x2", 0)
    .attr("y1", function(d){
      return yPositionScale(d.friend)
    })
    .attr("y2", function(d) {
      return yPositionScale(d.friend)
    })
    .transition()
    .duration(1500)
    .attr("x2", function(d) {
      return xPositionScale(d.message) - 4
    })
  // Adding text to the left side of the chart
  svg.selectAll(".label-friend")
    .data(datapoints)
    .enter().append("text")
    .text(function(d) {
      return d.friend
    })
    .attr("y", function(d){
      return yPositionScale(d.friend)
   })
    .attr("dy", 5)
    .attr("x", 0 - (margin.left/2) )
    .attr("text-anchor", "middle")

  // Adding text to the right side of the chart
  svg.selectAll(".label-total")
    .data(datapoints)
    .enter().append("text")
    .text(function(d) {
      return "(" + d.message + ")"
    })
    .attr("y", function(d){
      return yPositionScale(d.friend)
    })
    .attr("dy", 5)
    .attr("text-anchor", "left")
    .attr("x", 0)
    .transition()
    .duration(1500)
    .attr("x", function(d){
      return xPositionScale (d.message)
    })
    .attr("dx",10)


  // Add an x-Axis
  var xAxis = d3.axisBottom(xPositionScale)
    .tickFormat(d3.format("d")) // Remove the thousands marker
    svg.append("g")
      .attr("fill","black")
      .attr("transform", "translate(0," + (height)+ ")")
      .call(xAxis)
    // There is some custom styling going on down here:
      .select(".domain")
        .remove() // Removes the axis vertical line
    // And a nice little label to it!
    svg.append("text")
      .attr("class","x-axis-label")
      .text("Messages sent")
      .attr("x",width/2)
      .attr("y",height + margin.bottom)
      .attr("dy",-10)
      .attr("font-weight","bold ")
      .attr("font-size", 12)
      .attr("text-anchor","middle")

  }
})();