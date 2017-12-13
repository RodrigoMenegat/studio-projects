// CODE FOR CHART 4
// A COMPARATIVE TABLE BETWEEN WORDS OF EACH GENRE
(function() {
  var margin = { top: 50, left: 80, right: 80, bottom: 50 },
    height = 400 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right;

// An svg that lies behind the canvas
  var svgHolder = d3.select("#chart-6")
    .append("svg")
    .attr("class","canvas-svg-holder")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .style("position","absolute")

// Note that we use a Canvas in this chart because there are too many svg elements
  var canvas  = d3.select("#chart-6")
    .append("canvas")
    .attr("class", "canvas-small-multiple")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
  // The context tells tells the canvas whether we are going for 2d or 3d stuff
  // This is the place we actually draw.
  var context = canvas.node().getContext("2d")

// Building scales
    // Will position things on the left according to how old they are
    var xPositionTrad = d3.scaleLinear()
      // .domain will be set later
      .range([(width/2), 20])
    var xPositionNovo = d3.scaleLinear()
      // .domain will be set later
      .range([width/2, width-20])

    // Will position the information according to general frequency
    var yPositionScale = d3.scaleLinear()
    // .domain will be set later
      .range([height, 0]) 

    // Color will change color according to how much a word 'belong' to a genre
    var colorNovos = d3.scaleLinear()
      // .domain will be set later
      .range(["#eee3e3","#ffae00"])

    var colorTrad = d3.scaleLinear()
    // .domain will be set later
    .range(["#eee3e3","#660796"])

// MIGHTY D3 BRING THE DATA INTO THE ALTAR OF TCHERETCHECHE  
  d3.queue()
    .defer(d3.csv, "./data/lyrics_visualize.csv")
    .await(ready)

// Function ready    
  function ready(error, datapoints) {
  // Setting the real domains
    novoDomain = d3.extent(datapoints.map(function(d){ return +d.__ratio_novo_dividido_antigo } ))
    tradDomain = d3.extent(datapoints.map(function(d){ return +d.__ratio_antigo_dividido_novo } ))
    yPositionDomain = d3.extent(datapoints.map(function(d){ return +d.__ratio_geral } ))  
    xPositionNovo.domain(tradDomain)
    xPositionTrad.domain(tradDomain)
    yPositionScale.domain(yPositionDomain)
    colorNovos.domain(novoDomain)
    colorTrad.domain(tradDomain)

// Now stuff starts getting weird
// I will prepare everything I need for the canvas to work

  // This is a custom element that is never added to the DOM.
  // It's a dummy where d3 will draw stuff - PRETENDING that it is our actual page
  // When the time is due, we draw it to the canvas
    var detachedContainer = document.createElement("custom")
  // This is like doing "svg = d3.select("#div-id"), but, again, it's PRETENDING
    var dataContainer = d3.select(detachedContainer)

// We can add stuff to the dataContainer as it was good-old d3
    // But we store this into a variable called dataBinding
    // It will be used to 'bind' the data and draw on the canvas
    var dataBinding = dataContainer.selectAll(".node")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", "node")
      .attr("cx", function(d){
        if (+d.__ratio_antigo_dividido_novo >= +d.__ratio_novo_dividido_antigo) {
          return xPositionTrad(+d.__ratio_antigo_dividido_novo)
        }
        else {
          return xPositionNovo(+d.__ratio_novo_dividido_antigo)
        }
      })
      .attr("cy", function(d){
        return yPositionScale(+d.__ratio_novo)
      })
      .attr("r", 6)
      .attr("fill",function(d){
        if (+d.__ratio_antigo_dividido_novo >= +d.__ratio_novo_dividido_antigo) {
          return colorTrad(+d.__ratio_antigo_dividido_novo)
        }
        else {
          return colorNovos(+d.__ratio_novo_dividido_antigo)
        }
      })
      .attr("word", function(d){
        return d.index
      })
      .attr("ratio-novo", function(d){
        return Math.round(d.__ratio_novo * 100) / 100
      })
      .attr("ratio-antigo", function(d){
        return Math.round(d.__ratio_antigo * 100) / 100
      })
      .attr("mais-comum-novo", function(d){
        return Math.round(d.__ratio_novo_dividido_antigo * 10) / 10
      })
      .attr("mais-comum-antigo", function(d){
        return Math.round(d.__ratio_antigo_dividido_novo * 10) / 10
      })
      .attr("ratio-geral", function(d) {
        return Math.round(d.__ratio_geral * 100) / 100
      })
      .attr("opacity",1)

    //Select our dummy circles and draw the data to canvas
    dataBinding.each(function(d) { 
      //Select one of the circles
      var node = d3.select(this)
      //Draw each circle
      // This is using specific Canvas drawing syntax
      // It's very different from the regular d3.js syntax
      context.fillStyle = node.attr("fill");
      context.globalAlpha = 0.5 // This is like opacity
      // Draw
      context.beginPath()
      context.arc(node.attr("cx"), node.attr("cy"), node.attr("r"), 0,  2 * Math.PI, true)
      context.fill()
      context.closePath()
    }) // End of dataBinding.each

// Adding a new layer on the SVG, not the canvas
// To highlight only the words I want
  var filteredDatapoints = datapoints.filter(function(d){
    if (d.index === "esposa" || d.index === "amada" || d.index === "gatinha" ||
      d.index === "gostosa" || d.index === "pegador" || d.index === "solteiro") {
      return d
    }
  })

  svgHolder.selectAll(".node-highlights")
    .data(filteredDatapoints)
    .enter().append("circle")
    .attr("cx", function(d){
     if (+d.__ratio_antigo_dividido_novo >= +d.__ratio_novo_dividido_antigo) {
        return xPositionTrad(+d.__ratio_antigo_dividido_novo)
      }
     else {
        return xPositionNovo(+d.__ratio_novo_dividido_antigo)
      }
    })
    .attr("cy", function(d){
      return yPositionScale(+d.__ratio_novo)
    })
    .attr("r", 6)
    .attr("opacity",1)
    .attr("stroke", "black")
    .attr("stroke-width",2)
    .attr("fill",function(d){
      if (+d.__ratio_antigo_dividido_novo >= +d.__ratio_novo_dividido_antigo) {
        return colorTrad(+d.__ratio_antigo_dividido_novo)
      }
      else {
        return colorNovos(+d.__ratio_novo_dividido_antigo)
      }
    })

  svgHolder.selectAll(".label-highlights")
    .data(filteredDatapoints)
    .enter().append("text")
    .attr("x", function(d){
     if (+d.__ratio_antigo_dividido_novo >= +d.__ratio_novo_dividido_antigo) {
        return xPositionTrad(+d.__ratio_antigo_dividido_novo)
      }
     else {
        return xPositionNovo(+d.__ratio_novo_dividido_antigo)
      }
    })
    .attr("y", function(d){
      return yPositionScale(+d.__ratio_novo)
    })
    .attr("dx", function(d){
      if (d.index === "gostosa"){
        return 10
      }
      if (d.index === "solteiro"){
        return 32
      }
      else {
        return 0
      } 
    })
    .attr("dy", function(d){
      if (d.index === "gostosa"){
        return -10
      }
      if (d.index === "solteiro"){
        return 0
      }
      else {
        return 20
      }
    })
    .text(function(d){
      return d.index
    })
    .attr("font-size",14)
    .attr("text-anchor","middle")
    .attr("font-weight", "bold")
    .attr("fill", "black")

// Adding title and labels to the svg behind the canvas
    svgHolder.append("text")
      .text("Single vs. taken")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y",height * 0.1)
      .attr("text-anchor","middle")
      .attr("font-weight","bold")
      .attr("font-size",28)

    svgHolder.append("text")
      .text("Having a wife is definitely not something university sertanejos do")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y",height * 0.1)
      .attr("dy", 30)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",14)

    svgHolder.append("text")
      .text("common in both genres ↑")
      .attr("class","chart-title")
      .attr("x",width/2)
      .attr("y",height * 0.35)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",12)

    svgHolder.append("text")
      .text("more common in traditional ⟵")
      .attr("class","chart-title")
      .attr("x",width/2 - 30)
      .attr("y",height)
      .attr("dy", 30)
      .attr("text-anchor","end")
      .attr("font-weight","light")
      .attr("font-size",12)

    svgHolder.append("text")
      .text("⟶ more common in university")
      .attr("class","chart-title")
      .attr("x", width/ 2 + 30)
      .attr("y", height)
      .attr("dy", 30)
      .attr("text-anchor","start")
      .attr("font-weight","light")
      .attr("font-size",12)

  }

})();