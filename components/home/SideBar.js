import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";

class SideBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#27ae60" />
        <Text style={styles.text}>{this.props.name}</Text>
        <Text style={styles.text}>{this.props.email}</Text>
        <TouchableOpacity onPress={this.props.signOut}>
          <Text style={styles.text}>sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#27AE60"
  },
  text: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "bold",
    color: "white"
  }
});

export default SideBar;
