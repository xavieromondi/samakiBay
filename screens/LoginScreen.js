import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(
        authentication,
        email,
        password
      );
      navigation.navigate("User");
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log In" onPress={handleLogin} />
      <Button
        title="Don't have an account? Sign Up"
        onPress={() => navigation.navigate("SingUp")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 8,
    marginVertical: 8,
    width: "80%",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default LoginScreen;
