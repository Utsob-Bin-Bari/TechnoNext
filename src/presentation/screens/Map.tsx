import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Alert, PermissionsAndroid, Platform, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import { Colors } from '../constants/Colors';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  const [location, setLocation] = useState<LocationCoords>({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show you on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
          setIsLoading(false);
        }
      } catch (err) {
        console.warn(err);
        setIsLoading(false);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = useCallback((): void => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setIsLoading(false);
        
        // Update map location when we get the current position
        if (webViewRef.current) {
          webViewRef.current.postMessage(JSON.stringify({
            type: 'updateLocation',
            latitude,
            longitude
          }));
        }
      },
      (error) => {
        console.log('Location error:', error);
        Alert.alert(
          'Location Error', 
          'Could not get your current location. Using default location.',
          [{ text: 'OK' }]
        );
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  }, []);

  const generateMapHTML = () => {
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

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'mapReady') {
        console.log('Map is ready');
      }
    } catch (error) {
      console.log('Error parsing WebView message:', error);
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Your Location</Text>
      <Text style={styles.headerSubtitle}>OpenStreetMap</Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.Orange} />
      <Text style={styles.loadingText}>Loading map...</Text>
    </View>
  );

  const renderFreeMapNote = () => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>
        🗺️ <Text style={styles.noteTextBold}>Free Map:</Text> This app uses OpenStreetMap, 
        a free and open-source map service. No API keys required!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.White} />
      {renderHeader()}
      
      {isLoading ? (
        renderLoadingState()
      ) : (
        <>
          <View style={styles.mapContainer}>
            <WebView
              ref={webViewRef}
              style={styles.map}
              source={{ html: generateMapHTML() }}
              onMessage={handleWebViewMessage}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.webViewLoading}>
                  <ActivityIndicator size="large" color={Colors.Orange} />
                </View>
              )}
            />
          </View>
          {renderFreeMapNote()}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 10 : 38,
    paddingBottom: 7,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webViewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    textAlign: 'center',
  },
  noteContainer: {
    backgroundColor: '#d1ecf1',
    borderColor: '#bee5eb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 15,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    color: '#0c5460',
    lineHeight: 18,
    textAlign: 'center',
  },
  noteTextBold: {
    fontWeight: 'bold',
    color: '#0c5460',
  },
});

export default Map;









