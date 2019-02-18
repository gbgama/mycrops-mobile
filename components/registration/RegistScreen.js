import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  TextInput
} from "react-native";

class RegistScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      error: {},
      isLoading: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#27ae60" />
        <Text
          style={{
            fontSize: 38,
            fontWeight: "bold",
            color: "white",
            marginBottom: 10
          }}
        >
          Cadastro
        </Text>

        {this.state.error.name ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMsg}>{this.state.error.name}</Text>
          </View>
        ) : (
          <Text />
        )}

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

        {this.state.error.password2 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorMsg}>{this.state.error.password2}</Text>
          </View>
        ) : (
          <Text />
        )}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="nome"
            placeholderTextColor="white"
            returnKeyLabel="Email"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.emailInput.focus()}
            onChangeText={name => {
              let form = { ...this.state.form };
              form.name = name;
              this.setState({ form });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="white"
            keyboardType="email-address"
            returnKeyLabel="Senha"
            autoCapitalize="none"
            autoCorrect={false}
            ref={input => (this.emailInput = input)}
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={email => {
              let form = { ...this.state.form };
              form.email = email;
              this.setState({ form });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="senha"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            returnKeyLabel="Confirm"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={() => this.confirmInput.focus()}
            onChangeText={password => {
              let form = { ...this.state.form };
              form.password = password;
              this.setState({ form });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="confirmar senha"
            placeholderTextColor="white"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            ref={input => (this.confirmInput = input)}
            onChangeText={password2 => {
              let form = { ...this.state.form };
              form.password2 = password2;
              this.setState({ form });
            }}
          />
          {this.state.isLoading === true ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity
              style={styles.btnCadastroContainer}
              activeOpacity={0.7}
              onPress={this._registerAsync}
            >
              <Text style={styles.btnCadastroText}>Efetuar cadastro</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  _registerAsync = async () => {
    console.log(this.state);
    console.log("Enviando cadastro do usuario");
    this.setState({ isLoading: true });
    // efetuar cadastro do usuario
    fetch("https://mycrops.herokuapp.com/api/users/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.form)
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: false });

        if (!responseJson._id) {
          this.setState({ error: responseJson });
        } else {
          console.log("Cadastro realizado com sucesso");
          this.setState({ isLoading: false });
          console.log("redirecionando para login");
          this.props.navigation.navigate("Login", { user: responseJson });
        }
      })
      .catch(error => {
        this.setState({ isLoading: false });
        this.setState({ error: error });
        console.log(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27ae60"
  },
  formContainer: {
    padding: 20
  },
  input: {
    height: 40,
    width: 240,
    backgroundColor: "rgba(255,255,255, 0.2)",
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "white",
    fontSize: 18,
    textAlign: "center"
  },
  btnCadastroContainer: {
    backgroundColor: "rgba(230, 126, 34,1.0)",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 10,
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
    alignItems: "center",
    backgroundColor: "rgba(231, 76, 60, 0.7)",
    marginBottom: 2,
    borderWidth: 2,
    borderColor: "rgba(192, 57, 43, 1.0)",
    width: 240
  },
  errorMsg: {
    color: "#fff"
  }
});

export default RegistScreen;
