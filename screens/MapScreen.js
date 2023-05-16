import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { db } from "../firebase";
import { authentication } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { getDistance } from "geolib";
import React, { useState, useEffect } from "react";

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [deliveryTime, setDeliveryTime] = useState(null);

  useEffect(() => {
    // Retrieve the user's location data from Firestore
    const uid = authentication.currentUser.uid;
    const userRef = doc(db, "users", uid);

    const unsubscribe = onSnapshot(userRef, (doc) => {
      setUserLocation(doc.data());
    });

    return () => unsubscribe();
  }, []);

  // Calculate the distance between the user and the restaurant
  useEffect(() => {
    if (userLocation) {
      const userCoords = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      const restaurantCoords = {
        latitude: -1.30675,
        longitude: 36.80155,
      };
      const distance = getDistance(userCoords, restaurantCoords);
      setDistance(distance);

      // Calculate the delivery time assuming an average speed of 30 km/h for the motorcycle delivery
      const deliveryTime = distance / 1000 / 50; // Convert distance from meters to kilometers and divide by speed in km/h
      setDeliveryTime(deliveryTime);
    }
  }, [userLocation]);

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Display a marker at the user's location */}
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Your Location"
            description="This is your current location"
          />

          {/* Display a marker at the restaurant's location */}
          <Marker
            coordinate={{
              latitude: -1.30675,
              longitude: 36.80155,
            }}
            title="Restaurant Location"
            description="This is the restaurant's location"
          />
        </MapView>
      )}

      {distance && (
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>
            Distance to restaurant: {distance} meters
          </Text>
          {deliveryTime && (
            <Text style={styles.deliveryTimeText}>
              Estimated delivery time : {deliveryTime.toFixed(1)} hours
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  distanceContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  distanceText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
