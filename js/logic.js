function markerSize(magnitude) {
  return magnitude * 100000;
}

  var APILink =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
  
  var markerGroup = [];
  
  d3.json(APILink, function(data) {
      
      for (var i = 0; i < data.features.length; i++) {
          var circle = L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
            fillOpacity: 0.75,
            color: 'black',
            fillColor: 'purple',
            radius: markerSize(data.features[i].properties.mag)
          }).bindPopup(
              '<h2>' +
                data.features[i].properties.place +
                '</h2> <hr> <h3>Magnitude: ' +
                data.features[i].properties.mag +
                '</h3>'
                )
        markerGroup.push(
          circle
        )
    }
  

    var eqLayer = L.layerGroup(markerGroup);

     var layer1 = L.tileLayer(
        'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=' +
          'pk.eyJ1IjoiYmJ1Y2hha2UiLCJhIjoiY2podmJ4em9sMDNzODNxbWRhYjNhNm1kayJ9.bTCRxouRGxiRjhnmiR5leQ'
      );

    var baseMaps = {
        Light: layer1
      };

      var overlayMaps = {
        Earthquakes: eqLayer
      };

    var myMap = L.map('map-id', {
        center: [36.761526, 22.564117],
        zoom: 2,
        layers: [layer1, eqLayer]
      });

    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
      
     var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    labels = ['<strong>Earthquakes</strong>'],
    categories = ['Magnitude 4.5 and above'];

    for (var i = 0; i < categories.length; i++) {

            div.innerHTML += 
            labels.push(
                '<i class="circle" style="background:purple"></i> ' +
            (categories[i] ? categories[i] : '+'));

        }
        div.innerHTML = labels.join('<br>');
    return div;
    };
    legend.addTo(myMap);

 });