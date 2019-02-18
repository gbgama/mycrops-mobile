import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class LogoTitle extends Component {
  render() {
    return (
      <View>
        <Text style={styles.logoText}>myCrops</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgb(230, 126, 34)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 10
  }
});

export default LogoTitle;
