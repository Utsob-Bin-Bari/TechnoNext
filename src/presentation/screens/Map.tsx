import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  Alert, 
  PermissionsAndroid, 
  Platform, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
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
  const [initialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Your Location</Text>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Colors.Orange} />
      <Text style={styles.loadingText}>Loading map...</Text>
    </View>
  );

  const renderApiNote = () => (
    <View style={styles.noteContainer}>
      <Text style={styles.noteText}>
        📍 <Text style={styles.noteTextBold}>Note:</Text> For full map features on Android, 
        add your Google Maps API key to AndroidManifest.xml. iOS uses Apple Maps by default.
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
            <MapView
              style={styles.map}
              provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
              initialRegion={initialRegion}
              showsUserLocation={true}
              showsMyLocationButton={true}
              followsUserLocation={false}
              showsCompass={true}
              showsScale={Platform.OS === 'ios'}
              loadingEnabled={true}
              loadingIndicatorColor={Colors.Orange}
              loadingBackgroundColor={Colors.White}
            >
              <Marker
                coordinate={location}
                title="You are here"
                description="Your current location"
              />
            </MapView>
          </View>
          {renderApiNote()}
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
    justifyContent: 'flex-start',
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
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
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
    backgroundColor: '#fff3cd',
    borderColor: '#ffeaa7',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    margin: 15,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 18,
    textAlign: 'center',
  },
  noteTextBold: {
    fontWeight: 'bold',
    color: '#856404',
  },
});

export default Map;








