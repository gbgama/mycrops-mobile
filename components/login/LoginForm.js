import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Text
} from "react-native";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.error.email ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMsg}>{this.state.error.email}</Text>
          </View>
        ) : (
          <Text />
        )}

        {this.state.error.password ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMsg}>{this.state.error.password}</Text>
          </View>
        ) : (
          <Text />
        )}
        <TextInput
          style={styles.input}
          placeholder="email"
          placeholderTextColor="white"
          returnKeyLabel="Senha"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={email => this.setState({ email: email })}
        />
        <TextInput
          style={styles.input}
          placeholder="senha"
          placeholderTextColor="white"
          secureTextEntry
          returnKeyLabel="Login"
          ref={input => (this.passwordInput = input)}
          onChangeText={password => this.setState({ password: password })}
        />
        <TouchableOpacity
          onPress={this._getUserToken}
          style={styles.btnLoginContainer}
          activeOpacity={0.7}
        >
          <Text style={styles.btnLoginText}>login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnCadastroContainer}
          activeOpacity={0.7}
          onPress={() => this.props.navigation.navigate("Registration")}
        >
          <Text style={styles.btnCadastroText}>cadastro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _getUserToken = () => {
    fetch("https://mycrops.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(responseJson => {
        if (!responseJson.token) {
          this.setState({ error: responseJson });
        } else {
          console.log("Login realizado com sucesso");

          this._storeAsync(responseJson.token);

          this.props.navigation.navigate("App", {
            userToken: responseJson.token
          });
        }
      })
      .catch(error => {
        this.setState({ error: error });
        console.log(error);
      });
  };

  _storeAsync = async token => {
    // salvar token no asyncstorage
    await AsyncStorage.setItem("userToken", token);
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  btnLoginContainer: {
    backgroundColor: "rgba(52, 152, 219,1.0)",
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2
  },
  btnLoginText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  btnCadastroContainer: {
    backgroundColor: "rgba(230, 126, 34,1.0)",
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 2
  },
  btnCadastroText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  },
  errorContainer: {
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(231, 76, 60, 0.7)",
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "rgba(192, 57, 43, 1.0)",
    width: 340
  },
  errorMsg: {
    color: "#fff"
  }
});
