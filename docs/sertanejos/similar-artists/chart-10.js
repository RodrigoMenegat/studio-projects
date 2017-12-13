/* FINAL, FIXED CHART FOR THE T-SNE POSITION ALGO -*/
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

var tradicional = ['Cezar & Paulinho', 'Gilberto e Gilmar', 'João Mineiro e Marciano',
'Althair & Alexandre', 'André e Adriano', 'Bruno e Marrone', 'Chitãozinho e Xororó',
'Chrystian e Ralf', 'Duduca e Dalvan', 'Gian e Giovani', 'Felipe & Falcão', 'Gian & Giovani',
'João Paulo e Daniel', 'Jorge Henrique e Christiano', 'João Pedro e Cristiano', 'Matogrosso e Mathias',
'Milionário e José Rico', 'Pardinho e Pardal', 'Rick & Renner', 'Rionegro & Solimões', 
'Peão Carreiro e Zé Paulo', 'Tião Carreiro & Paraíso', 'Vieira e Vieirinha', 'Zezé Di Camargo e Luciano',
'Zé Mulato & Cassiano', 'Brenno Reis & Marco Viola'];

  var svg = d3.select("#chart-10")
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
      .text("Explore os dados")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y", - margin.top * 0.80)
      .attr("text-anchor","middle")
      .attr("font-weight","bold")
      .attr("font-size",32)
      .attr("fill","#ffffff")


    svg.append("text")
      .text("Selecione um círculo para descobrir quais são os artistas com letras mais semelhantes")
      .attr("class","chart-title")
      .attr("x", width/2)
      .attr("y", - margin.top * 0.60)
      .attr("text-anchor","middle")
      .attr("font-weight","light")
      .attr("font-size",20)
      .attr("fill","#ffffff")

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
      .attr("r", 10)
      .attr("fill", function(d){
        if ( universitario.includes(d.artist) ) {
          return 'orange';
        }
        else if ( tradicional.includes(d.artist) ) {
          return 'gray';
        }
        else if ( raiz.includes(d.artist) ) {
          return 'purple';
        }
      })
      .attr("opacity", 0.8)
      .on('mouseover.infobox-title', function(d){
        var infoBox = d3.select("#chart-10-infobox-title")
        var title = d.artist;
        infoBox.html(function(d) {
          return "<h3>" + title + "</h3>"
        }) // End of function (d)
      }) // End of on
      .on('mouseout.infobox-title', function(d){
        var infoBox = d3.select("#chart-10-infobox-title")
        infoBox.html(function(d) {
          return "<h3>SELECIONE UM ARTISTA</h3>"
        }) // End of function(d)
    }) // End of on
      .on('mouseover.infobox', function(d){
        var infoBox = d3.select("#chart-10-infobox")
        var title = d.artist
        var similarArtists = d.common_artists
        infoBox.html(function(d) {
          return "<b>Artistas mais semelhantes:</b></br>" +
              "1. " + similarArtists[0] + "</br>" +
              "2. " + similarArtists[1] + "</br>" +
              "3. " + similarArtists[2] + "</br>" +
              "4. " + similarArtists[3] + "</br>" +
              "5. " + similarArtists[4] + "</br>" +
          "</ol>"
         }) // End of function (d)
         .style("visibility","visible")
      }) // End of on
      .on('mouseout.infobox', function(d){
        var infoBox = d3.select("#chart-10-infobox")
        infoBox.html(function(d) {
          return ""
        }) // End of function(d)
        .style("visibility","hidden")
    }) // End of on
    .on("mouseover.circle", function(d){
      var circle = d3.select(this)
        .attr("stroke", "white")
        .attr("stroke-width", 2)
      circle.raise()
    }) // End of on
    .on("mouseout.circle", function(d){
      var circle = d3.select(this)
        .attr("stroke", "")
        .attr("stroke-width", 0)
      circle.raise()
    })



  } // End of .defer()

})(); // End of functionalities