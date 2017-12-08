// CODE FOR CHART 4
// A SCATTER PLOT MADE WITH CANVAS TO SHOW A LOT OF DOTS
(function() {
  var margin = { top: 50, left: 80, right: 80, bottom: 50 },
    height = 500 - margin.top - margin.bottom,
    width = 1200 - margin.left - margin.right;

  // The hiddenCanvas is used to listen for events and trigger interaction
  var hiddenCanvas  = d3.select("#chart-4")
    .append("canvas")
    .attr("id", "hidden-canvas-interactive")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .style("display","none") // Note that it nevers show up

// Note that we use a Canvas in this chart because there are too many svg elements
  var canvas  = d3.select("#chart-4")
    .append("canvas")
    .attr("id", "canvas-interactive")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)

  // A hack to use highlighting
    // I add an invisible svg called 'highlight'
    var highlight = d3.select("#chart-4")
      .append("svg")
      .attr("id", "highlight-scatter-svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)


  // The context tells tells the canvas whether we are going for 2d or 3d stuff
  // This is the place we actually draw.
  var context = canvas.node().getContext("2d")
  // Hidden canvas also needs one
  var hiddenContext = hiddenCanvas.node().getContext("2d")

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

    // TO DO - FIX CANVAS SIZE
    // radiusScale will depend on the ratio of usage of the word
    // var radiusScale = d3.scaleSqrt()
    //   //.domain will be set later
    //   .range([0,0.5])

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

  // This is an object to swtich between color of a circle (in the hidden canvas) and the node data  
    var colToCircle = {}

// Function that generates the next color in the sequence, going from 0,0,0 to 255,255,255.
    // From: https://bocoup.com/weblog/2d-picking-in-canvas
      var nextCol = 1
      function genColor(){
        var ret = []
        // via http://stackoverflow.com/a/15804183
        if(nextCol < 16777215){
          ret.push(nextCol & 0xff) // R
          ret.push((nextCol & 0xff00) >> 8) // G 
          ret.push((nextCol & 0xff0000) >> 16) // B
          nextCol += 1000 + 1 // Add 1 to the next color
        }
        var col = "rgb(" + ret.join(',') + ")"
        return col
      } // end of function genColor

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
      // Draw the visible canvas - note that it's done only once, since it's static
      context.beginPath()
      context.arc(node.attr("cx"), node.attr("cy"), node.attr("r"), 0,  2 * Math.PI, true)
      context.fill()
      context.closePath()
    }) // End of dataBinding.each

// The draw function of the hidden canvas
    // It builds the hidden canvas and then get the information from it
    // It takes a context - the hidden one - and a boolean - hidden can be true or false
    function drawCanvas(chosenContext, hidden) {
      //Clear canvas, putting a white rectangle on top of everything
      // If it was being drawn repetaedly, we would need to 
      // chosenContext.fillStyle = "#fff"
      // chosenContext.rect(0,0,canvas.attr("width"),canvas.attr("height"))
      // chosenContext.fill()
      
      //Select our dummy circles and draw the data to canvas.
      var elements = dataContainer.selectAll(".node")
      elements.each(function(d) {
        var node = d3.select(this)
        //If the hidden canvas was send into this function
        //and it does not yet have a color, generate a unique one
        if(hidden) {
          if(node.attr("color") === null) {
            // If we have never drawn the node to the hidden canvas get a new color for it and put it in the dictionary.
            node.attr("color", genColor())
            colToCircle[node.attr("color")] = node
          }// end of if
          // On the hidden canvas each circle gets a unique color.
          chosenContext.fillStyle = node.attr("color")
        } 

        else {
          chosenContext.fillStyle = node.attr("fill")
        }// end of else
        
        //Draw each circle
        chosenContext.beginPath()
        chosenContext.arc(node.attr("cx"), node.attr("cy"), node.attr("r"), 0,  2 * Math.PI, true)
        chosenContext.fill()
        chosenContext.closePath()
        })
      } // end of function drawCanvas definition
      
      // Draw the hiddenCanvas
      drawCanvas(hiddenContext, true)


    // And add an invisible circle to it
    // It will only come to life when I hover over a specific point
    highlight.append("circle")
        .attr("class", "circle-higlight")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("r", 6)
        .attr("visibility","hidden")

    highlight.append("text")
      .text("Conflito de gerações")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y",height * 0.1)
      .attr("text-anchor","middle")
      .attr("font-weight","bold")
      .attr("font-size",32)

// Now that it's all said and done, I'll add some labels and titles

    highlight.append("text")
      .text("Cada círculo é uma palavra. Todas estão representadas aqui, menos 'amor',")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y",height * 0.1)
      .attr("dy", 30)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",18)

    highlight.append("text")
      .text("porque esse termo é tão comum que bagunçaria a escala verical do gráfico.")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y",height * 0.1)
      .attr("dy", 50)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",18)

    highlight.append("text")
      .text("palavra mais comum em ambos os gêneros ↑")
      .attr("class","chart-title")
      .attr("x",width/2)
      .attr("y",height * 0.35)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",14)

    highlight.append("text")
      .text("palavra mais comum no sertanejo tradicional ⟵ ")
      .attr("class","chart-title")
      .attr("x",width/2 - 30)
      .attr("y",height)
      .attr("dy", 30)
      .attr("text-anchor","end")
      .attr("font-weight","light")
      .attr("font-size",14)

    highlight.append("text")
      .text("⟶ palavra mais comum no sertanejo universitário")
      .attr("class","chart-title")
      .attr("x", width/ 2 + 30)
      .attr("y", height)
      .attr("dy", 30)
      .attr("text-anchor","start")
      .attr("font-weight","light")
      .attr("font-size",14)

// Do stuff on click!
    // Listen for clicks on the main canvas
    highlight.on('mousemove', function(d){
      // Everytime that you click on canvas, draw the hidden thing
        //drawCanvas(hiddenContext, true)
         // Track where this click happened
        var mouse = d3.mouse(this)
        // Get the corresponding pixel color on the hidden canvas and look up the node in our map.
        // This will return that pixel's color
        var color = hiddenContext.getImageData(mouse[0], mouse[1], 1, 1).data;
        // Our map uses these rgb strings as keys to nodes.
        var colString = "rgb(" + color[0] + "," + color[1] + ","+ color[2] + ")"
        var node = colToCircle[colString]
        if (node){
          d3.select('#tooltip')
            .style("visibility","visible")
            .style('opacity', 0.6)
            .style('top', d3.event.pageY + 5 + 'px')
            .style('left', d3.event.pageX + 5 + 'px')
            .html(function(){
              if ( node.attr("mais-comum-antigo") > (node.attr("mais-comum-novo")) ) {
                return '<h4><b>' + node.attr("word") + '</b></h4>' + 'Usos a cada dez mil palavras:<b> ' + node.attr("ratio-geral") + 
              '</b><br><b>' + node.attr("mais-comum-antigo") + 'x</b> mais comum no sertanejo tradicional';
              }
              else {
              return '<h4><b>' + node.attr("word") + '</b></h4>' + 'Usos a cada dez mil palavras:<b> ' + node.attr("ratio-geral") + 
              '</b><br><b>' + node.attr("mais-comum-novo") + 'x</b> mais comum no sertanejo universitário';
              }
            })
          highlight.selectAll(".circle-higlight")
            .attr("cx", node.attr("cx"))
            .attr("cy", node.attr("cy"))
            .attr("visibility", "visible")
            .raise()

        } // End of if
        else {
          d3.select('#tooltip')
            .style('opacity', 0); // Makes tooltip invisible

          highlight.selectAll(".circle-higlight")
            .attr("cx", "")
            .attr("cy", "")
            .attr("visibility", "hidden")
            .raise()

        } // End of else
    }) // End of click event
  }

})();