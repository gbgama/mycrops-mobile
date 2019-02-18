import React, { Component } from "react";
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Drawer, Container, Header, Content, Button } from "native-base";

import LogoTitle from "./LogoTitle";
import SideBar from "./SideBar";
import HubSection from "./HubSection";
import CropSection from "./CropSection";

// Concerta a elevaçao do sidebar
Drawer.defaultProps.styles.mainOverlay.elevation = 0;

// HOME SCREEN
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("home mounted");
    this._getUserToken();
  }

  // Get user token
  _getUserToken = async () => {
    await AsyncStorage.getItem("userToken")
      .then(token => {
        this.setState({ token: token });
        this._getUserHub(token);
      })
      .catch(error => console.log(error));
  };

  // Get user hub and set to state.hub
  _getUserHub = token => {
    fetch("https://mycrops.herokuapp.com/api/hubs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ hub: responseJson });
      })
      .catch(error => {
        this.setState({ error: error });
        console.log(error);
      });
  };

  // sign out
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };

  // SIDEBAR HANDLERS
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    console.log("Estado atual:", this.state);

    if (!this.state.hub) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "#27AE60"
          }}
        >
          <ActivityIndicator size="large" color="#E67E22" />
        </View>
      );
    } else {
      return (
        <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={
            <SideBar
              name={this.state.hub.user.name}
              email={this.state.hub.user.email}
              navigator={this.navigator}
              signOut={this._signOutAsync}
            />
          }
          onClose={() => this.closeDrawer()}
        >
          <Container>
            <Header style={{ backgroundColor: "#27ae60" }}>
              <Container
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  backgroundColor: "#27ae60"
                }}
              >
                <LogoTitle />
                <Icon
                  onPress={() => this.openDrawer()}
                  name="bars"
                  size={30}
                  color="#fff"
                  style={{ marginTop: 10 }}
                />
              </Container>
            </Header>

            <View style={styles.container}>
              <HubSection
                hubName={this.state.hub.name}
                airTemp={this.state.hub.airTemperature}
                airHum={this.state.hub.airHumidity}
                updateTime={this.state.hub.updated}
                readings={this.state.hub.readings}
              />
              <CropSection
                name={this.state.hub.crops[0].name}
                soilHum={this.state.hub.crops[0].soilHumidity}
                condition={this.state.hub.crops[0].soilCondition}
                readings={this.state.hub.readings}
              />
            </View>
          </Container>
        </Drawer>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A9D6D"
  }
});

export default HomeScreen;
