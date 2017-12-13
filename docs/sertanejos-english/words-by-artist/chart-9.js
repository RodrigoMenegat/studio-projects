/* CHART 9 - d3.js script that adds each artist to the swiper */
(function() {
  var margin = { top: 200, left: 100, right: 100, bottom: 50 },
    height = 600 - margin.top - margin.bottom,
    width = 1000 - margin.left - margin.right;

// Initializes the swiper
    var swiper = new Swiper('.swiper-container', {
      init: false,
      initialSlide: 4,
      slidesPerView: 5,
      spaceBetween: 20,
      slidesPerGroup: 1,
      freeMode: true,
        loop: true,
      loopFillGroupWithBlank: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      uniqueNavElements: true,
      centeredSlides: true,
      grabCursor: true,
    }) // End of swiper init

// OH ALMIGHTY D3.JS READ THE DATA IN IN THE NAME OF MEPHISTO OUR OVERLORD
  d3.queue()
    .defer(d3.json, "./data/t-sne-central-words.json")
    .await(ready)

  function ready(error, datapoints) {
    console.log(datapoints)

    // Adds a listener to the swiper
    swiper.on("init", function(){
      // Selects the slider wrapper
      var wrapper = d3.select('#chart-9')
      // 1. Add one div for each artist
        .selectAll('div')
        .data(datapoints)
        .enter().append('div')
        .attr("class", "swiper-slide")
        .attr("id", function(d){
          return d.artist + "-slider"
        })
        .html(function(d){
            var similarArtists = d.common_artists
            var differentArtists = d.different_artists
            var keyWords = d.key_words
              return d.artist + '</br>' +  
              '1. ' + keyWords[0] + '</br>' +
              '2. ' + keyWords[1] + '</br>' +
              '3. ' + keyWords[2] + '</br>' +
              '4. ' + keyWords[3] + '</br>' +
              '5. ' + keyWords[4] + '</br>'
            }) // End of .htl.function(d)
        }) // End of .on('init')


    // Function that reinitializes the swiper so it is aware of the DOM changes
    function reinitSwiper(swiper) {
      setTimeout(function () {
      swiper.update()
      }, 50)
    }
    swiper.init()
    reinitSwiper(swiper)




  } // End of ready(error, datapoints)

})(); // End of functionalities