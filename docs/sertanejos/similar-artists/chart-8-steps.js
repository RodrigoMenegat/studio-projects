// CODE FOR CHART 8
// A T-SNE REPRESENTATION OF ARTIST SIMILARITY
(function() {
  var margin = { top: 200, left: 100, right: 100, bottom: 50 },
    height = 600 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right;

  // Arrays to use when drawing points
var raiz = ['Abel & Caim', 'Alan & Aladim', 'As Marcianas', 'Belmonte e Amaraí', 'Cascatinha & Inhana',
'Caçula & Marinheiro', 'Chico Rey e Paraná', 'Dino Franco e Mouraí','Liu & Léu', 'Gino & Geno', 
'Jacó e Jacozinho', 'Leôncio e Leonel', 'Lourenço & Lourival', 'Léo Canhoto e Robertinho', 
'Amado e Antônio', 'As Marcianas', 'Pena Branca e Xavantinho', 'Pedro Bento e Zé da Estrada',
'Raul Torres e Florêncio', 'Tião Carreiro e Pardinho', 'Tonico e Tinoco', 'Zilo e Zalo', 
'Zé Carreiro e Carreirinho', 'Zé Fortuna & Pitangueira'];

var universitario = ['Alex e Ronaldo', 'Bruninho e Davi', 'Carlos e Jader', 'Christian e Miguel',
'Cleber e Cauan', 'Cristiano Araújo', 'César Menotti e Fabiano', 'Edson e Hudson',
'Fernando e Sorocaba', 'Emerson e Polyana', 'Conrado e Aleksandro', 'Fred e Gustavo',
'Fiduma e Jeca', 'George Henrique e Rodrigo', 'Guilherme e Santiago', 'Gusttavo Lima', 'Bruno e Barretto',
'Gustavo Moura e Rafael', 'Hugo e Tiago', 'Humberto e Ronaldo', 'Israel & Rodolffo',
'Jads & Jadson', 'Jorge e Mateus', 'João Bosco e Vinícius', 'Luan Santana', 'João Carreiro & Capataz',
'João Neto & Frederico', 'Juan Marcus e Vinícius', 'Lucas Reis e Thácio', 'Marcos e Belutti', 
'Maria Cecilia e Rodolfo', 'Maiara e Maraisa', 'Marília Mendonça', 'Matheus e Kauan', 'Michel Teló',
'Munhoz e Mariano', 'Naiara Azevedo', 'Paula Fernandes', 'Simone e Simaria', 'Pedro Paulo e Alex',
'Thaeme e Thiago', 'Zé Henrique e Gabriel', 'Zé Neto e Cristiano'];
console.log(universitario)


var tradicional = ['Cezar & Paulinho', 'Gilberto e Gilmar', 'João Mineiro e Marciano',
'Althair & Alexandre', 'André e Adriano', 'Bruno e Marrone', 'Chitãozinho e Xororó',
'Chrystian e Ralf', 'Duduca e Dalvan', 'Gian e Giovani', 'Felipe & Falcão', 'Gian & Giovani',
'João Paulo e Daniel', 'Jorge Henrique e Christiano', 'João Pedro e Cristiano', 'Matogrosso e Mathias',
'Milionário e José Rico', 'Pardinho e Pardal', 'Rick & Renner', 'Rionegro & Solimões', 
'Peão Carreiro e Zé Paulo', 'Tião Carreiro & Paraíso', 'Vieira e Vieirinha', 'Zezé Di Camargo e Luciano',
'Zé Mulato & Cassiano', 'Brenno Reis & Marco Viola'];

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
      .attr("id", function(d){
        return d.artist.toLowerCase().replace(/ /g,'-').replace(/&/g,'e')
      })
      .attr("class", "artist-circle")
      .attr("cx", function(d){
        return xPositionScale(d.x)
      })
      .attr("cy", function(d){
        return yPositionScale(d.y)
      })
      .attr("r", 0)
      .attr("fill", "gray")
      .attr("opacity", 0.6)


    // SETTING THE STEP FUNCTIONALITY

      // I'll start adding circles to the chart based on the group they belong to
      // So I need to set some array variables to check if the class identification is

    console.log(datapoints)
    // Add Tonico e Tinoco
    d3.select("#fourth-step").on('stepin', function() {
        svg.selectAll("circle.artist-circle#tonico-e-tinoco")
          .attr("fill", "purple")
          .transition()
          .attr("r", 10)
        }) // End of on

    // Add Cascatinha e Inhana
    d3.select("#fifth-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#cascatinha-e-inhana")
          .attr("fill", "purple")
          .transition()
          .attr("r", 10)
        }) // End of on

    // Adds the others sertanejo-raiz
    d3.select("#sixth-step")
      .on('stepin', function() {
        for (i = 0; i < raiz.length; i++) {
        var drawThis = raiz[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'e')
        console.log(drawThis)
        svg.select("circle.artist-circle#" + drawThis)
          .attr("fill", "purple")
          .transition()
          .attr("r", 10)
        } // End of for loop
      })

    d3.select("#seventh-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#milionário-e-josé-rico")
          .attr("fill", "gray")
          .transition()
          .attr("r", 10)
        }) // End of on

    d3.select("#eigth-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#chitãozinho-e-xororó")
          .attr("fill", "gray")
          .transition()
          .attr("r", 10)
        svg.selectAll("circle.artist-circle#zezé-di-camargo-e-luciano")
          .attr("fill", "gray")
          .transition()
          .attr("r", 10)
        }) // End of on

    d3.select("#ninth-step")
      .on('stepin', function() {
        for (i = 0; i < tradicional.length; i++) {
        var drawThis = tradicional[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'e')
        console.log(drawThis)
        svg.select("circle.artist-circle#" + drawThis)
          .attr("fill", "gray")
          .transition()
          .attr("r", 10)
       } // End of for
     })

    d3.select("#tenth-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#jorge-e-mateus")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10)
        }) // End of on

    d3.select("#eleventh-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#fernando-e-sorocaba")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10)
        svg.selectAll("circle.artist-circle#joão-bosco-e-vinícius")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        }) // End of on

    d3.select("#twelth-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#luan-santana")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10)
        svg.selectAll("circle.artist-circle#michel-teló")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        svg.selectAll("circle.artist-circle#gustavo-lima")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        }) // End of on

    d3.select("#thirteenth-step")
      .on('stepin', function() {
        svg.selectAll("circle.artist-circle#marília-mendonça")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10)
        svg.selectAll("circle.artist-circle#maiara-e-maraisa")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        svg.selectAll("circle.artist-circle#simone-e-simaria")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10)
        svg.selectAll("circle.artist-circle#naiara-azevedo")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        svg.selectAll("circle.artist-circle#paula-fernandes")
          .attr("fill", "orange")
          .transition()
          .attr("r", 10) 
        }) // End of on

      d3.select("#fourteenth-step")
        .on('stepin', function() {
          for (i = 0; i < universitario.length; i++) {
          var drawThis = universitario[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'e')
          console.log(drawThis)
          svg.select("circle.artist-circle#" + drawThis)
            .attr("fill", "orange")
            .transition()
            .attr("r", 10)
         } // End of for
       })

  }

})();