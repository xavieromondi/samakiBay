import { StatusBar } from "expo-status-bar";
import { OneSignal } from "react-native-onesignal";
import axios from "axios";
import React, { useState, useEffect } from "react";
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
  const API_KEY = "ZmRmYmQ3NTYtZjcxZC00OWMyLTg5ZDAtNTY4MzI4MDgyZGUz";
  const ONESIGNAL_APP_ID = "43ad2f5a-8798-4773-bc8b-6ed3de961eca";
  const BASE_URL = "https://onesignal.com/api/v1";

  const [number, setNumber] = useState("0797211187");
  const [amount, setAmount] = useState(route.params.totalAmount);

  useEffect(() => {
    // Initialize OneSignal
    OneSignal.setAppId("43ad2f5a-8798-4773-bc8b-6ed3de961eca");

    // Add event listeners
    OneSignal.addEventListener("received", onReceived);
    OneSignal.addEventListener("opened", onOpened);
    OneSignal.addEventListener("ids", onIds);

    return () => {
      // Remove event listeners
      OneSignal.removeEventListener("received", onReceived);
      OneSignal.removeEventListener("opened", onOpened);
      OneSignal.removeEventListener("ids", onIds);
    };
  }, []);

  const handleNumberChange = (text) => {
    setNumber(text);
  };

  const handleAmountChange = (text) => {
    setAmount(text);
  };

  const optionsBuilder = (method, path, body) => {
    return {
      method,
      url: `${BASE_URL}/${path}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${API_KEY}`,
      },
      body: body ? JSON.stringify(body) : null,
    };
  };

  const createNotification = async (data) => {
    const options = optionsBuilder("post", "notifications", data);
    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const viewNotification = async (notificationId) => {
    const path = `notifications/${notificationId}?app_id=${ONESIGNAL_APP_ID}`;
    const options = optionsBuilder("get", path);
    try {
      const response = await axios(options);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayNowPress = async () => {
    const notificationData = {
      app_id: ONESIGNAL_APP_ID,
      included_segments: ["Subscribed Users"],
      data: {
        foo: "bar",
      },
      contents: {
        en: "Sample Push Message",
      },
    };

    try {
      const { id } = await createNotification(notificationData);
      console.log("Notification created with ID:", id);

      const pushNotification = {
        contents: { en: "Hello world!" },
        include_external_user_ids: ["314058240583"], // Replace with the user ID of the receiver app
        priority: 10,
      };

      const response = await OneSignal.sendPush(pushNotification);
      console.log("Push notification sent successfully:", response);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }

    navigation.navigate("Map"); // navigate to "Map" screen
  };

  const onReceived = (notification) => {
    console.log("Notification received:", notification);
  };

  const onOpened = (openResult) => {
    console.log("Notification opened by the user:", openResult);
  };

  const onIds = (device) => {
    console.log("Device info:", device);
  };

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
