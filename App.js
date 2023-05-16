import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";

import SignUpScreen from "./screens/signUpScreen";
import LoginScreen from "./screens/LoginScreen";
import UserInfoScreen from "./screens/UserInfoScreen";
import CartScreen from "./screens/CartScreen";
import MapScreen from "./screens/MapScreen";
import PayScreen from "./screens/PayScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SingUp" component={SignUpScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="User" component={UserInfoScreen} />
        <Stack.Screen name="Pay" component={PayScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
