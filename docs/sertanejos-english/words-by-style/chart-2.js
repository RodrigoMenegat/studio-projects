// CODE FOR CHART 2
// A COMPARATIVE TABLE BETWEEN WORDS OF EACH GENRE
// THIS ONE SHOWS THE WORDS MOST COMMON IN SERTANEJO TRADICIONAL
(function() {
  var margin = { top: 200, left: 80, right: 80, bottom: 50 },
    height = 800 - margin.top - margin.bottom,
    width = 550 - margin.left - margin.right;

  var svg = d3.select("#chart-2")
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
    .defer(d3.csv, "./data/words-tradicional.csv")
    .await(ready)

  function ready(error, tradicional) {
    console.log(tradicional)

    // TO DO: define a custom domain for the colorScale
    // Note that I can use a single map because the ammount of elements in every dataset is the same
    tradicionalWords = tradicional.map(function(d){ return d.index})
    yPositionScale.domain(tradicionalWords)

    // Adding a title
    svg.append("text")
      .attr("class", "title")
      .text("The most characteristic words")
      .attr("x", width/2)
      .attr("y", -margin.top)
      .attr("dy", 50)
      .attr("font-size", 26)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill","black")
      .attr("font-weight","bold")
    svg.append("text")
      .attr("class", "title")
      .text("of traditional sertanejo")
      .attr("x", width/2)
      .attr("y", -margin.top)
      .attr("dy", 80)
      .attr("font-size", 26)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill","black")   
      .attr("font-weight","bold")

    // Adding header to word
    svg.append("text")
      .attr("class","header")
      .text("Word")
      .attr("x", width * 0)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    // Adding the name of the word to the svg
    svg.selectAll(".word_tradicional")
      .data(tradicional)
      .enter().append("text")
      .attr("y", function(d) {
        return yPositionScale(d.index)
      })
      .attr("x", width * 0)
      .attr("text-anchor", "middle")
      .text(function(d){
        return d.index
      })

    // Adding header to ratio
    svg.append("text")
      .attr("class","header")
      .text("How many times")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("it's more common")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("in traditional")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("sertanejo")
      .attr("x", width * 0.33)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
  // Adding the number of times the word is more common than in the other genre
    svg.selectAll(".ratio_tradicional")
      .data(tradicional)
      .enter().append("text")
      .text(function(d){
        return (Math.round(+d.__ratio_antigo_dividido_novo) + "x")
      })
      .attr("y", function(d) {
        return yPositionScale(d.index)
      })
      .attr("x", width * 0.33)
      .attr("text-anchor", "middle")
      .attr("font-weight", "bold")

    // Adding a header for the ratio in tradicional
    svg.append("text")
      .attr("class","header")
      .text("Appearence ratio")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 0)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("out of 10k words")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("in traditional")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("sertanejo")
      .attr("x", width * 0.66)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
  // Add a value for each ratio in tradicional
  svg.selectAll(".tradicional_ratio_label")
    .data(tradicional)
    .enter().append("text")
    .attr("x", width * 0.66)
    .attr("y", function(d){
      return yPositionScale(d.index)
    })
    .attr("fill","#AB59D4")
    .text(function(d){
      return (Math.round(d.__ratio_antigo * 100)) / 100
    })
    .attr("text-anchor","middle")
    .attr("font-weight","bold")

// Add a header for the ratio in universitario
    svg.append("text")
      .attr("class","header")
      .text("Appearence ratio")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 0)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("out of 10k words")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 15)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("in university")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 30)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.append("text")
      .attr("class","header")
      .text("sertanejo")
      .attr("x", width * 0.99)
      .attr("y", -margin.top * 0.45)
      .attr("dy", 45)
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "arial")
      .attr("fill", "#a9a9a9")
    svg.selectAll(".universitario_ratio_label")
    .data(tradicional)
    .enter().append("text")
    .attr("x", width * 0.99)
    .attr("y", function(d){
      return yPositionScale(d.index)
    })
    .attr("fill","#f4bc42")
    .text(function(d){
      return Math.round(d.__ratio_novo * 100) / 100
    })
    .attr("text-anchor","middle")
    .attr("font-weight","bold")

}

})();