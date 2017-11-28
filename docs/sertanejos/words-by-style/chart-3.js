// CODE FOR CHART 3
// A COMPARATIVE TABLE BETWEEN WORDS OF EACH GENRE
// THIS ONE SHOWS THE WORDS THAT ARE MORE CHARACTERISTIC OF SERTANEJO UNIVERSITÁRIO
(function() {
  var margin = { top: 200, left: 80, right: 80, bottom: 50 },
    height = 800 - margin.top - margin.bottom,
    width = 450 - margin.left - margin.right;


  var svg_2 = d3.select("#chart-3")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Buildins scales

  // Will position the information evenly spaced horizontally
  var xPositionScale = d3.scaleBand()
    // .domain will be set later
    .range([0, width]) 

  // Will position the information evenly spaced vertically
  var yPositionScale = d3.scaleBand()
  // .domain will be set later
    .range([0, height]) 

  var xPositionPoint = d3.scalePoint()
    // .domain will be set later
    .range([0, width]) 

  var yPositionPoint = d3.scalePoint()
    // .domain will be set later
      .range([0, height])

  // Color will become darker as the word is used more
  var colorScale = d3.scaleLinear()
    // .domain will be set later
    .range(["#e7ca52","#ff9b0b"])

  // radiusScale will depend on the ratio of usage of the word
  var radiusScale = d3.scaleSqrt()
    .domain([0,2])
    .range([0,1.5])

  // MIGHTY D3 BRING THE DATA INTO THE ALTAR OF TCHERETCHECHE  
  d3.queue()
    .defer(d3.csv, "./data/words-universitario.csv")
    .await(ready)

  function ready(error, universitario) {
    console.log(universitario)

    // Seting domain
    universitarioWords = universitario.map(function(d){ return d.index})
    yPositionScale.domain(universitarioWords)
    // CHART FOR THE SERTANEJO UNIVERSITÁRIO
    // Same code, other dataset, minor tweals

    // Adding title
    svg_2.append("text")
      .attr("class", "title")
      .text("Palavras mais características")
      .attr("x", width/2)
      .attr("y", -margin.top)
      .attr("dy", 50)
      .attr("font-size", 26)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill","black")
      .attr("font-weight","bold")
    svg_2.append("text")
      .attr("class", "title")
      .text("do sertanejo universitário")
      .attr("x", width/2)
      .attr("y", -margin.top)
      .attr("dy", 80)
      .attr("font-size", 26)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill","black")   
      .attr("font-weight","bold")
    
    // Adding header to word
    svg_2.append("text")
      .attr("class","header")
      .text("Palavra")
      .attr("x", width * 0)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    // Adding the name of the word to the svg_2
    svg_2.selectAll(".word_universitario")
      .data(universitario)
      .enter().append("text")
      .text(function(d){
        return d.index
      })
      .attr("y", function(d) {
        return yPositionScale(d.index)
      })
      .attr("x", width * 0)
      .attr("text-anchor", "middle")

    // Adding header to ratio
    svg_2.append("text")
      .attr("class","header")
      .text("Quantas vezes")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("é mais comum")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("no sertanejo")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("universitário")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
  // Adding the number of times the word is more common than in the other genre
    svg_2.selectAll(".ratio_universitário")
      .data(universitario)
      .enter().append("text")
      .text(function(d){
        return (Math.round(+d.__ratio_novo_dividido_antigo) + "x")
      })
      .attr("y", function(d) {
        return yPositionScale(d.index)
      })
      .attr("x", width * 0.33)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")

    // Adding a header for the ratio in tradicional
    svg_2.append("text")
      .attr("class","header")
      .text("Ocorrências por")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 0)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("10 mil palavras")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("no sertanejo")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("universitário")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
  // Add a value for each ratio in tradicional
  svg_2.selectAll(".universitario_ratio_label")
    .data(universitario)
    .enter().append("text")
    .attr("x", width * 0.66)
    .attr("y", function(d){
      return yPositionScale(d.index)
    })
    .attr("fill","#f4bc42")
    .text(function(d){
      return (Math.round(d.__ratio_novo * 100)) / 100
    })
    .attr("text-anchor","middle")
    .attr("font-weight","bold")

// Add a header for the ratio in universitario
    svg_2.append("text")
      .attr("class","header")
      .text("Ocorrências por")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 0)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("10 mil palavras")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("no sertanejo")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.append("text")
      .attr("class","header")
      .text("tradicional")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg_2.selectAll(".universitario_ratio_label")
    .data(universitario)
    .enter().append("text")
    .attr("x", width * 0.99)
    .attr("y", function(d){
      return yPositionScale(d.index)
    })
    .attr("fill","#AB59D4")
    .text(function(d){
      return Math.round(d.__ratio_antigo * 100) / 100
    })
    .attr("text-anchor","middle")
    .attr("font-weight","bold")

  }

})();