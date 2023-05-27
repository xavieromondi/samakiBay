import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import { collection, doc, getDoc } from "firebase/firestore";
import { db, authentication } from "../firebase";

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
      const userData = await fetchData(); // Retrieve the user data here
      await sendCourierNotification(userData); // Pass the user data to the function
      navigation.navigate("Map"); // navigate to "Map" screen
    } catch (error) {
      console.log("Error sending Courier notification:", error);
    }
  };

  const fetchData = async () => {
    try {
      const uid = authentication.currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Use the retrieved data as your push notification payload
        console.log(userData);
        return userData;
      }
    } catch (error) {
      console.log("Error retrieving data:", error);
    }
  };

  async function sendCourierNotification(userData) {
    try {
      const token = "ExponentPushToken[Bq6W8XNZHxm7SL9B2G-7vC]";
      const message = {
        to: {
          expo: {
            token: token,
          },
        },
        content: {
          title: "Notification Title",
          body: "Notification Body",
        },
        data: {
          latitude: userData.latitude,
          longitude: userData.longitude,
          name: userData.name,
          phone: userData.phone,
          address: userData.address,
          orderItems: route.params.orderItems,
          totalPrice: route.params.totalAmount,
        },
      };

      const { requestId } = await courier.send({
        message: message,
      });

      console.log("Courier notification sent:", requestId);
    } catch (error) {
      console.log("Error sending Courier notification:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

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
