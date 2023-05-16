import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { db, authentication } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import "url-search-params-polyfill";

const UserInfoScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationRetrieved, setLocationRetrieved] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocationRetrieved(true);
    };

    getLocation();

    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        // Get the data from the notification
        const data = notification.request.content.data;

        // Update the state with the new latitude and longitude values
        setLatitude(data.latitude);
        setLongitude(data.longitude);
        setLocationRetrieved(true);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSave = async () => {
    if (!locationRetrieved) {
      // Location data has not been retrieved yet
      alert("Please wait for the location to be retrieved before saving.");
      return;
    }

    // Get the current user's UID
    const uid = authentication.currentUser.uid;

    // Create a new user object
    const user = {
      name,
      phone,
      address,
      latitude,
      longitude,
    };

    try {
      // Add the new user to the "users" collection in Firestore
      await setDoc(doc(db, "users", uid), user);

      // Request permission to send push notifications
      const settings = await Notifications.getPermissionsAsync();
      if (settings.granted) {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
        });
      } else {
        alert("You need to enable notifications to use this feature.");
      }

      // Clear the form
      setName("");
      setPhone("");
      setAddress("");
      setLatitude(null);
      setLongitude(null);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Fish Bay!</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Name:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Text style={styles.label}>Phone:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#006200",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default UserInfoScreen;
