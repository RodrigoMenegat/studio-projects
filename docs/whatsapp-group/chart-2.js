(function() {
  // Set values for the margins, height and width
  var margin = { top: 20, left: 100, right: 20, bottom: 60},
      height = 500 - margin.top - margin.bottom,
      width = 500 - margin.left - margin.right;

  // Create a SVG to hold the chart
  var svg = d3.select("#chart-2")
      .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)

  // First, for the length of each pie chart
  var lengthScale = d3.scaleLinear()
    // .domain() will go from zero to the maximum value, so it will be set later
    .range([5, height/2]) // Maximum height will occupy half of the svg. It starts at 5 to make for the innerRadius

  var colorScale = d3.scaleLinear()
    .range(["#EEBFE4","#7E0C39"])

  /* I need use FOUR linear color scales, one for each part of the day
  so I can color the chart accordingly:
  a) midnight-dawn
  b) dawn-noon
  c) noon-twilight
  d) twilight-midnight */

  var dawnScale = d3.scaleOrdinal()
    .domain(["00","01","02","03","04","05","06"])
    .range(["#0F2F57","#210D49", "#55196D","#912989", "#B53CTF", "#DA546C"]) // Deep blue - light pink

  var noonScale = d3.scaleOrdinal()
    .domain(["07","08","09","10","11","12"])
    .range(["#CA8686","#BF7998","#AA96BC","#9AACD7","#95B8E0", "#8BC3F2"]) // Light pink - light blue

  var twilightScale = d3.scaleOrdinal()
    .domain(["13", "14", "15", "16", "17", "18"])
    .range(["#90AAD2","#9592B3","#9A7993", "#9F6174", "#A44854", "#8C3341"]) // Light blue - dark red

  var midnightScale = d3.scaleOrdinal()
    .domain(["19", "20", "21", "22", "23"])
    .range(["#7D3547", "#6F374E", "#402F4E", "#273158", "#0F2F59"]) // Dark red - deep blue 

  // A pie generator for drawing the slices
  var pie = d3.pie()
    .value(1/24)
    .sort(null) // Don't sort by value - let the slices go in the order that the months appear in the .csv

  // Crate a recipe for the arc
  var arc = d3.arc()
    .innerRadius(5) // The inner radius starts at 5, so we have a dot in the center
    .outerRadius(function(d) { // But the ending point of the wedge is related to the monthly temperature
        return lengthScale(d.data.message)
    }) 

// This seond recipe determines how the arc starts in the beginning of a transiction
  var arcStart = d3.arc()
    .innerRadius(5) // The inner radius starts at 5, so we have a dot in the center
    .outerRadius(0)

  // Magic invocation for the data:
  // "OH HOLY D3.JS, LIBRARY OF LIBRARIES, THE LORD OF ALL DATAVIZ PACKAGES, I OFFER THEE A CSV FILE"
  d3.queue()
    .defer(d3.csv, "data/hours.csv")
    .await(ready)

  function ready(error, datapoints) {
    // Use d3.map and d3.max to set up the missing domain
    maxMessages = d3.max(datapoints.map(function(d){ return +d.message} )) // The + here reminds d3 that we are not dealing with strings
    lengthScale.domain([0, maxMessages])
    colorScale.domain([0, maxMessages])

    // Create a container so I can put the 'g' inside, 
    // in order to center the pie on it
    var container = svg.append("g")
      .attr("transform", "translate(360,160)")

  // Take container.
  // Add the 24 pie-slices to it. (They are the pie(datapoints))
  // Use the arc recipe - whose height is taken from the lengthScale - to get a pie-like shape.
  console.log(pie(datapoints))
  container.selectAll("path")
        .data(pie(datapoints))
        .enter().append("path")
        .attr("class", function(d){
          return d.data.hour
        })
        .attr("d", function(d) {
          return arcStart(d)
        })
        .attr("stroke","white")
        .attr("stroke-width",1)
        .attr("fill", function(d) {
          if (d.data.hour === "00" || d.data.hour === "01" || d.data.hour === "02" || d.data.hour === "03" || 
            d.data.hour === "04" || d.data.hour === "05" || d.data.hour === "06" ) {
              return dawnScale(d.data.hour)
          }
          else if (d.data.hour === "07" || d.data.hour === "08" || d.data.hour === "09" || d.data.hour === "10" || 
            d.data.hour === "11" || d.data.hour === "12" ) {
              return noonScale(d.data.hour)
          }
          else if (d.data.hour === "13" || d.data.hour === "14" || d.data.hour === "15" || d.data.hour === "16" || 
            d.data.hour === "17" || d.data.hour === "18" ) {
              return twilightScale(d.data.hour)
          }
          else {
            return midnightScale(d.data.hour)
          }
        })     
        .transition()
        .duration(1000)
        .attr("d", function(d) {
          return arc(d)
        })
        /*.attr("fill", function(d) {
          return colorScale(d.data.message)
        })*/

  // Adding some marks to our weeeeeird clock
  svg.append("text")
    .attr("class", "clock-label")
    .text("12 AM")
    .attr("x", 350 )
    .attr("y", height)
    .attr("dy", -30)
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("class", "clock-label")
    .text("12 PM")
    .attr("x", 350 )
    .attr("y", 0)
    .attr("dy", 30)
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("class", "clock-label")
    .text("6 PM")
    .attr("x", 50)
    .attr("y", 170)
    .attr("dx", 60)
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("class", "clock-label")
    .text("6 PM")
    .attr("x", 50)
    .attr("y", 170)
    .attr("dx", 60)
    .attr("text-anchor", "middle")

  svg.append("text")
    .attr("class", "clock-label")
    .text("6 AM")
    .attr("x", width + 30)
    .attr("y", 170)
    .attr("text-anchor", "middle")


  }

})();