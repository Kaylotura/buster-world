/**
* This handles the creation of the map background aspect of the game.
*/

'use strict';


/**
 * Handles a location error
 */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}


/**
 * Creates the map background.
 */
function initMap() {
  var backMap = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -122.67699033021927, lng: 45.502508273306624},
    zoom: 18,
    disableDefaultUI: true
  });
  var infoWindow = new google.maps.InfoWindow({backMap: backMap});

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      backMap.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, backMap.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, backMap.getCenter());
  }
}


$(document).ready(initMap);
