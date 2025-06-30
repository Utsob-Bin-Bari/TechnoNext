interface LocationCoords {
  latitude: number;
  longitude: number;
}

export const generateMapHTML = (location: LocationCoords): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OpenStreetMap</title>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
        #map {
          height: 100vh;
          width: 100%;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        // Initialize the map
        var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 13);
        
        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
          tileSize: 256,
          zoomOffset: 0
        }).addTo(map);
        
        // Custom icon for user location
        var userIcon = L.divIcon({
          className: 'user-location-marker',
          html: '<div style="background-color: #007AFF; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(0,122,255,0.5);"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });
        
        // Add user location marker
        var userMarker = L.marker([${location.latitude}, ${location.longitude}], {
          icon: userIcon
        }).addTo(map);
        
        userMarker.bindPopup("<b>You are here!</b><br>Your current location").openPopup();
        
        // Listen for messages from React Native
        window.addEventListener('message', function(event) {
          try {
            var data = JSON.parse(event.data);
            if (data.type === 'updateLocation') {
              var newLatLng = [data.latitude, data.longitude];
              map.setView(newLatLng, 13);
              userMarker.setLatLng(newLatLng);
              userMarker.bindPopup("<b>You are here!</b><br>Your current location").openPopup();
            }
          } catch (e) {
            console.log('Error parsing message:', e);
          }
        });
        
        // Add zoom controls
        L.control.zoom({
          position: 'bottomright'
        }).addTo(map);
        
        // Add scale control
        L.control.scale({
          position: 'bottomleft'
        }).addTo(map);
        
        // Notify React Native that map is ready
        setTimeout(function() {
          window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'mapReady'
          }));
        }, 1000);
      </script>
    </body>
    </html>
  `;
};
