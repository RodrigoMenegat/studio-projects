// Set's the control for the dropdown menu: victims/criminals
  $(document).ready(function () {
      $('#select-menu').change(function () {
    var selectedGroup = $('#select-menu').val();
    
    geojson.eachLayer(function (layer) {
      if (selectedGroup == 0)
        {
          map.addLayer(layer);
        } else if (layer.feature.properties.code != selectedGroup) {
      // If the layer's id is different from the selected one, remove it from the map
      map.removeLayer(layer);
        }
        else {
      // Otherwise add it do the map
      map.addLayer(layer);
        }
    });

  });
  });