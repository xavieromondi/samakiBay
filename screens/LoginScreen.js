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
      <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
      </View>
      <View style={styles.form}>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Log In" onPress={handleLogin} />
        <Text style={styles.signupLink}>
          Don't have an account?{" "}
          <Text
            style={styles.signupLinkText}
            onPress={() => navigation.navigate("SignUp")}
          >
            Sign Up
          </Text>
        </Text>
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
    backgroundColor: "#04a4b3",
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
  error: {
    color: "red",
    marginBottom: 8,
  },
  signupLink: {
    marginTop: 16,
    textAlign: "center",
  },
  signupLinkText: {
    color: "#006200",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
