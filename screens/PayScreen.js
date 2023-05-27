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
import { CourierClient } from "@trycourier/courier";
import mpesaLogo from "../assets/safaricom-mpesa.jpg";

const courier = CourierClient({
  authorizationToken: "pk_prod_GMCW61E76GMAX0JGKCY78BGFKGJ0",
});

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
    try {
      await sendPushNotification();
      navigation.navigate("Map"); // navigate to "Map" screen
    } catch (error) {
      console.log("Error sending push notification:", error);
    }
  };

  async function sendPushNotification() {
    try {
      const { requestId } = await courier.send({
        message: {
          to: {
            expo: {
              token: "ExponentPushToken[Bq6W8XNZHxm7SL9B2G-7vC]",
            },
          },
          content: {
            title: "You've got mail",
            body: "Hello world!",
          },
          data: {
            fakeData: "data",
          },
        },
      });

      console.log("Courier notification sent:", requestId);
    } catch (error) {
      console.log("Error sending Courier notification:", error);
      throw error;
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
          value={number.toString()}
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
