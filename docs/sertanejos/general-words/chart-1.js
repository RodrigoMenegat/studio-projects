(function() {
  var margin = { top: 150, left: 80, right: 80, bottom: 50 },
    height = 200 - margin.top - margin.bottom,
    width = 800 - margin.left - margin.right;

  var svg = d3.select("#chart-1")
        .append("svg")
        .attr("height", height + margin.top + margin.bottom)
        .attr("width", width + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Buildins scales

  // xPosition will be how many times a given word appears. Further to the right, more usage
  var xPositionScale = d3.scaleLinear()
    .range([0, width]) 

  // Color will become darker as the word is used more
  var colorScale = d3.scaleLinear()
    // domain will be set later
    .range(["#e7ca52","#ff9b0b"])

  d3.queue()
    .defer(d3.csv, "./data/general-words.csv")
    .await(ready)

  function ready(error, datapoints) {
    console.log(datapoints)

    // Defining custom domains
    var colorDomain = d3.extent(datapoints.map(function(d){ return +d.__ratio_geral}))
    colorScale.domain(colorDomain)
    
    var xPositionDomain = d3.extent(datapoints.map(function(d){ return +d.__ratio_geral}))
    xPositionScale.domain(xPositionDomain)

    // Adding a title
    svg.append("text")
      .attr("class",".title")
      .text("As palavras mais comuns do sertanejo")
      .attr("text-anchor","middle")
      .attr("font-size",32)
      .attr("font-weight","bold")
      .attr("x", width/2)
      .attr("y",-margin.top / 1.5)

    // Adding a subtitle
    svg.append("text")
      .attr("class",".subtitle")
      .text("usos a cada 10 mil palavras, considerando todos os subgêneros do ritmo")
      .attr("text-anchor","middle")
      .attr("font-size",18)
      .attr("font-weight","light")
      .attr("x", width/2)
      .attr("y",-margin.top/2)

    // Adding a single line to the svg
    svg.append("line")
      .attr("x1", 0 - margin.left)
      .attr("y1", height/2)
      .attr("x2", width + margin.right)
      .attr("y2", height/2)
      .attr("stroke-width",1.2)
      .attr("stroke", "black")
    // Add anotations to the bottom
    svg.append("text")
      .text("Usada mais vezes ⟶") // ⟶ é um símbolo de seta unicode
      .attr("x", width-10)
      .attr("y", height/2)
      .attr("dy", 30)
      .attr("text-anchor","middle")

    // Adding one dot for each word
    svg.selectAll(".circle_word")
      .data(datapoints)
      .enter().append("circle")
      .attr("class", function(d){
        return d.index
      })
      .attr("r",6)
      .attr("cy",height/2)
      .attr("stroke","black")
      .attr("opacity",0.8)
      .transition()
      .duration(2000)
      .attr("cx", function(d){
        return xPositionScale(d.__ratio_geral)
      })
      .attr("fill",function(d){
        return colorScale(d.__ratio_geral)
      })

    // Adding annotation for the words
    svg.selectAll(".word_labels")
      .data(datapoints)
      .enter().append("text")
      .text(function(d){
        if (d.index === "quero"){
          return Math.round(d.__ratio_geral)
        }
        else {
          return d.index
        }
      })
      .attr("x", function(d){
        return xPositionScale(d.__ratio_geral)
      })
      .attr("dx",function(d){
        if (d.index === "quero") {
          return -5
        }
        else {
          return 0
        }
      })
      .attr("y", height/2)
      .attr("dy", function(d){
        if (d.index === "quero") {
          return 35
        }
        else { 
          return -30
        }
      })
      .attr("text-anchor","middle")
      .attr("font-size",12)
      .attr("font-weight",function(d){
        if (d.index === "quero") {
          return "1"
        }
        else {
          return "bold"
        }
      })

  // Adicionar valor para essas palavras
    svg.selectAll(".word_labels")
      .data(datapoints)
      .enter().append("text")
      .text(function(d){
        if (d.index === "quero"){
          return d.index
        }
        else {
          return Math.round(d.__ratio_geral)
        }
      })
      .attr("x", function(d){
        return xPositionScale(d.__ratio_geral)
      })
      .attr("dx",function(d){
        if (d.index === "quero") {
          return -5
        }
        else {
          return 0
        }
      })
      .attr("y", height/2)
      .attr("dy", function(d){
        if (d.index === "quero"){
          return 20
        }
        else {
          return -15
        }
      })
      .attr("text-anchor","middle")
      .attr("font-size",12)
      .attr("font-weight",function(d){
        if (d.index === "quero") {
          return "bold"
        }
        else {
          return "1"
        }
      })

  }

})();