import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      if (location && location.coords) {
        const { latitude, longitude } = location.coords;
        const locationDetails = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (locationDetails && locationDetails.length > 0) {
          const { city, region, country } = locationDetails[0];
          setCity(`${city}, ${region}, ${country}`);
        }
      }
    })();
  }, []);

  return (
    <View>
      {location ? (
        <View>
          <Text>
            Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
          </Text>
          {city && <Text>City: {city}</Text>}
        </View>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
};
export default LocationScreen;
