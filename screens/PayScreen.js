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

  const handlePayNowPress = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: number,
        amount: amount,
      }),
    };

    fetch(
      "https://fishbay-daraja-sandbox-production.up.railway.app/stk",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        sendPushNotification();
        navigation.navigate("Map"); // navigate to "Map" screen
      })
      .catch((error) => console.log(error));
  };

  async function sendPushNotification() {
    const message = {
      to: " ExponentPushToken[8xTOb2F7efcLbb9mrwP-Yl]",
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
            "key=AAAAvaP60bM:APA91bG6ES1i5BC4ak7iY9bU2cWRhS0HD_L_byXEIatK2dynHXsSZSuxX7K0SjXEc4PIAaqTg0TmZfMsD0yJUOCNJIRaNcthSOGmqOLd3XRjpy1QGE1WHJaFJnFF8NSkgzI4WWeKSZNo",
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
