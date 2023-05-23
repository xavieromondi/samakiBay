import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import mpesaLogo from "../assets/safaricom-mpesa.jpg";

export default function PayScreen({ navigation, route }) {
  const [number, setNumber] = useState("0797211187");
  const [amount, setAmount] = useState(route.params.totalAmount);

  const handleNumberChange = (text) => {
    setNumber(text);
  };

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const handlePayNowPress = () => {
    sendPushNotification();
    navigation.navigate("Map"); // navigate to "Map" screen
  };

  async function sendPushNotification() {
    const message = {
      to: "fYqXWLBSSe6QeBWBAJZ7Ya:APA91bG9Aqdu7NIOLJ8qfuhxdYxxbtKfptv4YDWRoOd-JTDmV-tTXKaovCgwumeFSYOELB20kfRnY_2S1xwbjAcf8GMItb_IEVI9BppA5GQjlZ7FcWQk7KCKfeMTuV_8xqUA-OAWcFqo",
      priority: "normal",
      data: {
        experienceId: "@myasma01/samaki-bay",
        scopeKey: "@myasma01/samaki-bay",
        title: "You've got mail",
        message: "Hello world! ",
      },
    };

    try {
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAgwV0q34:APA91bFZlMb5Qyn44-uizBCtot0QvNBRDShGRkwr4vxrXCgCKiUDYZt4mUxOsL6BKuJj-8Eq8sGhR8PXp16LZkTTMWFD2NYvr9PjtXK1jUSOr0pFwt-mYR9kdWxdUFmioidj-YdmLqjl",
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      console.log("Push notification response:", data);
    } catch (error) {
      console.log("Error sending push notification:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Image source={mpesaLogo} style={styles.logo} />

      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter number"
          keyboardType="numeric"
          value={number}
          onChangeText={handleNumberChange}
        />
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter amount"
          keyboardType="numeric"
          value={amount.toString()} // convert number to string
          onChangeText={handleAmountChange}
        />
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePayNowPress}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: 300,
    fontSize: 18,
  },
  payButton: {
    backgroundColor: "#218838",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  payButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  checkoutButton: {
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
  },
});
