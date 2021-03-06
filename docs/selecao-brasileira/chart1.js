(function() {
  // Set values for the margins, height and width
  var margin = { top: 20, left: 70, right: 120, bottom: 50},
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
  // Domain will go from 1930 (the Seleção was first assembled im 1914, but there are no top goal scorers from that age) to 2017
  var xPositionScale = d3.scaleLinear()
    .domain([1930,2017])
    .range([0, width])

  // The yPositionScale takes the number of goals scored by each player. It returns a position from 0 to height
  // The domain ranges from 0 to 80 - Pelé, the most prolific goal scorer, scored 77 times.
  var yPositionScale = d3.scaleLinear()
    .domain([0,80])
    .range([height, 0])

  // I need to set a recipe for the lines.
  // Vertically, they will always start at zero and end at the yPositionScale for total goals scored
  // Horizontally, they will start in the year a player has debuted for the Seleção and end in the year of his last match
  // (Or in 2018, in case we are talking about players that are still active.)
  var line = d3.line()
    .x(function(d) {
      return xPositionScale(d.year)
    })
    .y(function(d){
      return yPositionScale(d.goals_total)
    })
    //A.curve(d3.curveCardinal) // With some nice, beautiful curve

  // Now let's read the data in, with our usual MAGIC INVOCATION
  // "Oh, d3, please use your hallowed powers and read this .csv for me!"
  d3.queue()
    .defer(d3.csv, "./data/goal-scorers.csv")
    .await(ready);

  function ready(error, datapoints) {

    // Since we are plotting one line for each player, I need to nest my variables.
    var nested = d3.nest()
      .key(function(d) {
        return d.player
      })
      .entries(datapoints)

    console.log("Nested:", nested)
    // Let's start drawing.

    // First, append a line for each player
    svg.selectAll(".player_line")
      .data(nested)
      .enter().append("path")
      .attr("class", function(d){
        return d.key.toLowerCase().replace(/ /g,'-')
      })
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", function(d) {
        if (d.key === "Neymar") {
          return "#19c119"
        }
        else {
          return "#E0D6E0"
        }
      })
      .attr("d", function(d) {
        return line(d.values) 
      })
       .attr("opacity", 0.6)
      // An event listener for highlighting on hover and showing the names that are hidden
      .on("mouseover", function(d) {
        var paths = d3.selectAll('path.' + d.key.toLowerCase().replace(/ /g,'-'))
          paths.attr("stroke",function(d){
            if (d.key === "Neymar"){
              return "green"
            }
            else {
              return "#353635"
            }
          })
          paths.raise()
        var circles = d3.selectAll("circle." + d.key.toLowerCase().replace(/ /g,'-'))
          circles.attr("fill",function(d){
            if (d.key === "Neymar"){
              return "green"
            }
            else {
              return "#353635"
            }
          })
          circles.raise()
        var labels = d3.selectAll("text." + d.key.toLowerCase().replace(/ /g,'-'))
          labels.attr("visibility", "visible")
          labels.raise()
      })
      .on("mouseout", function(d) {
        var paths = d3.selectAll('path.' + d.key.toLowerCase().replace(/ /g,'-'))
          paths.attr("stroke", function(d){
            if (d.key === "Neymar"){
              return "#19c119"
            }
            else {
              return "#E0D6E0"
            }
          })
        var circles = d3.selectAll("circle." + d.key.toLowerCase().replace(/ /g,'-'))
          circles.attr("fill", function(d){
            if (d.key === "Neymar"){
              return "#19c119"
            }
            else {
              return "#E0D6E0"
            }
          })
        var labels = d3.selectAll("text." + d.key.toLowerCase().replace(/ /g,'-'))
          labels.attr("visibility", function(d) {
            if (d.key === "Pelé" || d.key === "Romário" || d.key === "Ronaldo" || d.key === "Zico" || d.key == "Neymar") {
              return "visible"
            }
            else {
              return "hidden"
            }
          })
      })
     

    // Add a single dot in the end of each line
    svg.selectAll(".circle-in-the-end")
      .data(nested)
      .enter().append("circle")
      .attr("class", function(d){
        return d.key.toLowerCase().replace(/ /g,'-')
      })
      .attr("r",3)
      .attr("cx", function(d){
        var first = d.values[d.values.length-1] // Gets the first object of nested array
        return xPositionScale(first.year) // And read the key 'year'
      })
      .attr("cy", function(d) {
        var first = d.values[d.values.length-1] // Gets the first object of nested array
        return yPositionScale(first.goals_total) 
        }) // And read the key 'goals_total'
      .attr("fill", function(d) {
        if (d.key === "Neymar") {
          return "#19c119"
        }
        else {
          return "#E0D6E0"
        }
      })
      // An event listener for highlighting on hover and showing the names that are hidden
      .on("mouseover", function(d) {
        var paths = d3.selectAll('path.' + d.key.toLowerCase().replace(/ /g,'-'))
          paths.attr("stroke",function(d){
            if (d.key === "Neymar"){
              return "green"
            }
            else {
              return "#353635"
            }
          })
          paths.raise()
        var circles = d3.selectAll("circle." + d.key.toLowerCase().replace(/ /g,'-'))
          circles.attr("fill",function(d){
            if (d.key === "Neymar"){
              return "green"
            }
            else {
              return "#353635"
            }
          })
          circles.raise()
        var labels = d3.selectAll("text." + d.key.toLowerCase().replace(/ /g,'-'))
          labels.attr("visibility", "visible")
          labels.raise()

      })
      .on("mouseout", function(d) {
        var paths = d3.selectAll('path.' + d.key.toLowerCase().replace(/ /g,'-'))
          paths.attr("stroke", function(d){
            if (d.key === "Neymar"){
              return "#19c119"
            }
            else {
              return "#E0D6E0"
            }
          })
        var circles = d3.selectAll("circle." + d.key.toLowerCase().replace(/ /g,'-'))
          circles.attr("fill", function(d){
            if (d.key === "Neymar"){
              return "#19c119"
            }
            else {
              return "#E0D6E0"
            }
          })
        var labels = d3.selectAll("text." + d.key.toLowerCase().replace(/ /g,'-'))
          labels.attr("visibility", function(d) {
            if (d.key === "Pelé" || d.key === "Romário" || d.key === "Ronaldo" || d.key === "Zico" || d.key == "Neymar") {
              return "visible"
            }
            else {
              return "hidden"
            }
          })
      })

     // We want Neymar to be above all the mess of other lines when we first load the page, so:
     neymarPath = svg.select("path.Neymar")
      neymarPath.raise()

    // Add a top label for some specific players
    svg.selectAll(".text-labels")
      .data(nested)
      .enter().append("text")
      .attr("class", function(d){
        return d.key.toLowerCase().replace(/ /g,'-')
      })
      .text(function(d) {
        return d.key
      })
      .attr("x", function(d) {
        var first = d.values[d.values.length-1]
        return xPositionScale(first.year)
      })
      .attr("y", function(d) {
        var first = d.values[d.values.length-1]
        return yPositionScale(first.goals_total) 
      })
      .attr("visibility", function(d) {
        if (d.key === "Pelé" || d.key === "Romário" || d.key === "Ronaldo" || d.key === "Zico" || d.key == "Neymar") {
          return "visible"
      }
        else {
          return "hidden"
        }
      })
      .attr("fill", "black")
      .attr("font-weight","bold")
      .attr("dx", 7) // push 5 pixels right
      .attr("dy", 3) // push 3 pixels down
      .attr("font-size", "12px")

    // Finally, I need the X and Y axis.

    // First, x axis
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
      .text("Year")
      .attr("x",width/2)
      .attr("y",height + margin.bottom)
      .attr("dy",-10)
      .attr("font-weight","bold ")
      .attr("font-size", "12px")
      .attr("text-anchor","middle")

      // Then, the y axis
    var yAxis = d3.axisLeft(yPositionScale)
      .tickSize(0 - width) // Make the ticks occupy the whole svg, left to right
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)
    // There is some custom styling going on down here:
      .select(".domain")
        .remove() // Removes the axis vertical line
    svg.selectAll(".tick:not(:first-of-type) line")
      .attr("stroke", "#777") // Styling the ticks - color
      .attr("stroke-dasharray", "2,3"); // Styling the ticks - dot size
    // And a nice little label to it!
    svg.append("text")
      .attr("class","y-axis-label")
      .text("Goals scored")
      .attr("x", 0 - (height/2))
      .attr("y", -30)
      .attr("dy",-5)
      .attr("font-weight","bold ")
      .attr("font-size", "12px")
      .attr("text-anchor","middle")
      .attr("transform", "rotate(-90)")
  }

})();