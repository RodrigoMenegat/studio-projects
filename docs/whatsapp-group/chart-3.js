// CALEANDAR HEATMAP
(function() {
  // Set values for the margins, height and width
  var margin = { top: 100, left: 20, right: 20, bottom: 20},
      height = 300 - margin.top - margin.bottom,
      width = 300 - margin.left - margin.right;

  // Append an svg
  var container = d3.select("#chart-3")

  // Set the scales

   // xPositionScale will take the month
  var yPositionScale = d3.scalePoint()
      .domain([0,1,2,3,4,5])
      .range([0,height])

  // yPositionScale will take the weekday
  var xPositionScale = d3.scalePoint()
    .domain([0,1,2,3,4,5,6])
    .range([0, width])

  // colorScale will go from light red-pinkish tone to some dark wine color
  var colorScale = d3.scaleLinear()
    //.domain() will be set later
    .range(["#FFB9B9", "#360000"])

    var radiusScale = d3.scaleSqrt()
    //.domain() will be set later
    .range([0,15])

  // timeParse will take a date format and return a datetime object
  var timeParse = d3.timeParse("%d/%m/%Y")
  var day = d3.timeFormat("%d")
  var weekday = d3.timeFormat("%w")
  var month = d3.timeFormat("%B") // Month as a word (e.g "October")
  var weekYear = d3.timeFormat("%U")
  var getFirstOfMonth = d3.timeFormat("01/%m/%Y")
  
  // Reading the data in
  d3.queue()
    .defer(d3.csv, "./data/dates.csv")
    .await(ready);

  function ready(error, datapoints) { 
    var nested = d3.nest()
      .key(function(d) {
        return month(timeParse(d.date))
  })
      .entries(datapoints)
      .sort(null)
    
  // Setting the domain for the scales
  var messageExtent = d3.extent(datapoints.map(function(d) { return +d.message }) )
  colorScale.domain(messageExtent)
  radiusScale.domain(messageExtent)

  // Adding one svg for each month
  container.selectAll(".svg-month")
    .data(nested)
    .enter().append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .each(function(d) {
      // Selects one particular svg
      var svg = d3.select(this)
      
      // Sets a tooltip for each day
      var tip = d3.tip()
      .attr('class', 'd3-tip')
      .html(function(d) {
        return "<strong>Date:</strong> <span>" + d.date + "</span><br><strong>Messages:</strong> <span>" + d.message + "</span>";
      })
      svg.call(tip)
      
      // Now we work with the values inside the nested object
      var innerDatapoints = d.values

      // Adding a circle for each day
      svg.selectAll(".day-circle")
          .data(innerDatapoints)
          .enter().append("circle")
          .attr("r",function(d){
            return radiusScale(d.message)
          })
          .attr("stroke", "white")
          .attr("stroke-width",1)
          .attr("fill",function(d){
            return colorScale(d.message)
          })
          .attr("cy", function(d){
            // find the first day of the month
            var firstOfMonth = getFirstOfMonth(timeParse(d.date))
            // find out how many weeks later we are
            var diff = (weekYear(timeParse(d.date))) - weekYear(timeParse(firstOfMonth))
            // use that number
            return yPositionScale(diff)
          })
          .attr("cx", function(d){
            return xPositionScale(weekday(timeParse(d.date)))
          })
          .attr("opacity", 1  )
          // Add a tooltip event
          .on("mouseover", tip.show)
          .on("mouseout", tip.hide)

      // Addind one label for each svg
      svg.append("text")
        .attr("class", ".month-label")
        .text(function (d){ 
          return d.key.toUpperCase()
        })
        .attr("x", width/2) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy",-20)
        .attr("fill", "black")
        .attr("text-anchor","middle")
        .attr("font-weight","bold")

      // And also weekday labels
      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Sun")
        .attr("x", 0) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")


      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Mon")
        .attr("x", 45) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")

      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Tue")
        .attr("x", 85) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")

      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Wed")
        .attr("x", 130) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")

      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Thu")
        .attr("x", 175) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")

      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Fri")
        .attr("x", 220) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")

      svg.append("text")
        .attr("class", ".weekday-label")
        .text("Sat")
        .attr("x", 260) // Half of the width positions it right on the middle of the svg
        .attr("y", - margin.top/2)
        .attr("dy", 15)
        .attr("fill", "black")
        .attr("font-weight","bold")
        .attr("text-anchor","middle")


        })



  }

})();