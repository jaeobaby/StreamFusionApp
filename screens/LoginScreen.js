import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, Alert } from "react-native";
import { login, signup } from "../utils/authManager";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      Alert.alert("Login Error", e.message);
    }
  };

  const handleSignup = async () => {
    try {
      await signup(email, password);
    } catch (e) {
      Alert.alert("Signup Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StreamFusion</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color="#00FFFF" />
      <View style={{ height: 10 }} />
      <Button title="Sign Up" onPress={handleSignup} color="#00FFFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#00FFFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: "#fff",
  },
  title: {
    color: "#00FFFF",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
  },
});
