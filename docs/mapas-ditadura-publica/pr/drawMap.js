// Set's the Leaflet map
  var map = L.map('map')
  // Sets the starting position of the map (Long-lat-zoom)
  .setView([24.5787619,-51.4176337], 8.25);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    minZoom: 3,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
  }).addTo(map);

  // Control that shows information on hover
  var info = L.control();

  info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
  };

  info.update = function (props) {
    this._div.innerHTML = (props ?
      '<h2>' + props.name + '</h2><h4>' + props.city + ", " + props.state + "</h4>" + props.desc 
            : "<h2>Nas ruas do Brasil, a ditadura ainda vive</h2>43 anos depois do golpe militar que suspendeu a democracia no paí por duas décadas, ruas nomeadas em homenagem aos criminosos do regime, em verde, são muito mais comuns do que as que fazem referência aos mortos e desaparecidos, representadas em vermelho.<br><br>Selecione uma rua para aprender sobre o homenageado");
  };

  info.addTo(map);    

  function style(feature) {
    return {
      weight: 3,
      opacity: 0.8,
      color: feature.properties.color,
      dashArray: '0',
      fillOpacity: 1,
      fillColor: 'None'
    };
  }

  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
    info.update(layer.feature.properties);
  }

  var geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
  }

//  function zoomToFeature(e) {
//    map.fitBounds(e.target.getBounds());
//  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: layer.bindPopup("<h3>" + feature.properties.name + "</h3><h4>" + feature.properties.city 
        + ", " + feature.properties.state + "</h4>" +
      feature.properties.desc),
    });
  }

  map.addEventListener("popupopen", function() {
    info._div.style.visibility = "hidden";
  });

  map.addEventListener("popupclose", function() {
    info._div.style.visibility = "visible";
  });

  var customGeojson = L.geoJson(null, {
    style: style,
    onEachFeature: onEachFeature
  });

  geojson = omnivore.geojson('PR.geojson', null, customGeojson).addTo(map);