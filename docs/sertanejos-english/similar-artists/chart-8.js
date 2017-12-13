// CODE FOR CHART 8
// A T-SNE REPRESENTATION OF ARTIST SIMILARITY
(function() {
  var margin = { top: 200, left: 100, right: 100, bottom: 50 },
    height = 600 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right;

   var svg = d3.select("#chart-8")
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Building scales
  var xPositionScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, width]) 
  var yPositionScale = d3.scaleLinear()
    .domain([0,1])
    .range([0, height])

// Defining a tooltip
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong>" + d.artist + "</strong";
    })
  svg.call(tip)


// MIGHTY D3 BRING THE DATA INTO THE ALTAR OF TCHERETCHECHE  
  d3.queue()
    .defer(d3.json, "./data/t-sne-central-words.json")
    .await(ready)

  function ready(error, datapoints) {
    console.log(datapoints)

    // Adding a title
    svg.append("text")
      .text("Quem parece com quem?")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y", - margin.top * 0.80)
      .attr("text-anchor","middle")
      .attr("font-weight","bold")
      .attr("font-size",32)

    svg.append("text")
      .text("No gráfico, cada ponto representa um artista. Um algoritmo de machine-learning")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y", - margin.top * 0.60)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",20)

    svg.append("text")
      .text("posicionou os círculos de acordo com a similaridade das letras dos 99 músicos.")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y", - margin.top * 0.45)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",20)

    svg.selectAll(".artist-node")
      .data(datapoints)
      .enter().append("circle")
      .attr("label-text",function(d){
        return d.artist
      })
      .attr("class", function(d){
        return d.artist.toLowerCase().replace(/ /g,'-').replace(/&/g,'e')
      })
      .attr("cx", function(d){
        return xPositionScale(d.x)
      })
      .attr("cy", function(d){
        return yPositionScale(d.y)
      })
      .attr("r", 7)
      .attr("fill", "gray")
      .attr("opacity", 0.6)
      .on("mouseover.main", function(d){
        var artist = d3.select(this)
          artist.attr("fill", "#EE7600")
          artist.attr("stroke","black")
          artist.attr("stroke-width", 2)
        // Selecting the most similar artist to highlight as well
      })
      .on("mouseout.main", function(d){
        var artist = d3.select(this)
        artist.attr("fill", "gray")
        artist.attr("stroke","none")
        artist.attr("stroke-width", 0)
      })
      .on("mouseover.secondary", function(d){
        // Selecting the most similar artist to highlight as well
        var similarArtists = d.common_artists // This is a list of similar artists that will be highlighted with less emphasis
          for (i = 0; i < 1; i++) { 
          var mostSimilar = d3.select("circle." + similarArtists[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'e'))
            mostSimilar.attr("fill", "#f6ba7f")
          }
      })
      .on("mouseout.secondary", function(d){
        // Selecting the most similar artist to highlight as well
        var similarArtists = d.common_artists // This is a list of similar artists that will be highlighted with less emphasis
          for (i = 0; i < 1; i++) { 
          var mostSimilar = d3.select("circle." + similarArtists[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'e'))
            mostSimilar.attr("fill", "gray")
          }
      })
      //.on("mouseover.tip", tip.show)
      //.on("mouseout.tip", tip.hide)
      .on("mouseover.infobox", function(d){
        var similarArtists = d.common_artists
        var differentArtists = d.different_artists
        var keyWords = d.key_words
        d3.select("#chart-8-info-box")
          .style("visibility", "visible")
          .html(function(){
          return '<h3><b>' + d.artist + '</b></h3>' + 
          '<div style="float:left;margin-right:10%">' +
          '<b> Artistas mais parecidos:</b>' + 
          '<br>1. ' + similarArtists[0] +
          '<br>2. ' + similarArtists[1] +
          '<br>3. ' + similarArtists[2] +
          '<br>4. ' + similarArtists[3] +
          '<br>5. ' + similarArtists[4] + '</div>' +
          '<div style="float:left;margin-right:10%">' +
          '<b> Palavras mais centrais:</b>' + 
          '<br>1. ' + keyWords[0] +
          '<br>2. ' + keyWords[1] +
          '<br>3. ' + keyWords[2] +
          '<br>4. ' + keyWords[3] +
          '<br>5. ' + keyWords[4] + '</div>'
        })
      })
      .on("mouseout.infobox", function(d){
        d3.select("#chart-8-info-box")
          .style("visibility", "hidden")
      })/*
      .on("mouseover.labels", function(d){
        var similarArtists = d.common_artists
        var filteredDatapoints = datapoints.filter(function(d) { return similarArtists[0] === d.artist })
        svg.selectAll(".similar-labels")
          .data(filteredDatapoints)
          .enter().append('text')
          .attr("class", "similar-labels")
          .text(function(d){
            return d.artist
          })
          .attr("x", function(d){
            return xPositionScale(d.x)
          })
          .attr("y", function(d){
            return yPositionScale(d.y)
          })
          .attr("dy", 15)
          .attr("text-anchor","middle")
          .attr("font-weight","bold")
          .attr("font-size", 10)
          .style("pointer-events","none")
      })
      .on("mouseout.labels", function(d){
        svg.selectAll(".similar-labels").remove()
      }) */



  }

})();