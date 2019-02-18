import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  AsyncStorage,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";

import LoginForm from "./LoginForm";

class LoginScreen extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar backgroundColor="#27ae60" />
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>myCrops</Text>
          <Text style={styles.logoDesc}>
            Monitore seu cultivo de qualquer lugar
          </Text>
        </View>
        <View style={styles.formContainer}>
          <LoginForm navigation={this.props.navigation} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27ae60"
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  logoText: {
    color: "white",
    fontSize: 56,
    fontWeight: "bold",
    textShadowColor: "rgb(230, 126, 34)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  },
  logoDesc: {
    color: "white",
    fontSize: 20,
    marginTop: 10,
    width: 240,
    textAlign: "center",
    opacity: 0.9
  },
  formContainer: {}
});

export default LoginScreen;
