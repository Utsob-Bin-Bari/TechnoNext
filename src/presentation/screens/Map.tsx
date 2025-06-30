import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Alert, PermissionsAndroid, Platform, StyleSheet, SafeAreaView, StatusBar, ActivityIndicator} from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from '@react-native-community/geolocation';
import { Colors } from '../constants/Colors';
import Header from '../components/Header';
import { generateMapHTML } from '../../application/services/map';

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
      <Header 
        type="map"
        title="Your Location"
        subtitle="OpenStreetMap"
      />
      
      {isLoading ? (
        renderLoadingState()
      ) : (
        <>
          <View style={styles.mapContainer}>
            <WebView
              ref={webViewRef}
              style={styles.map}
              source={{ html: generateMapHTML(location) }}
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









