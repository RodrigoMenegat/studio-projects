// Set's the Leaflet map
  var map = L.map('map')
  // Sets the starting position of the map (Long-lat-zoom)
  .setView([-12.9967148,-56.1237464], 7);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    minZoom: 3,
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.light'
  }).addTo(map);

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
  }

  var geojson;

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
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

  var customGeojson = L.geoJson(null, {
    style: style,
    onEachFeature: onEachFeature
  });

  geojson = omnivore.geojson('mt.geojson', null, customGeojson).addTo(map);