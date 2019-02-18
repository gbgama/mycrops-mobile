import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import HomeScreen from "./home/HomeScreen";
import LoginScreen from "./login/LoginScreen";
import RegistScreen from "./registration/RegistScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";

const AppStack = createStackNavigator(
  { Home: HomeScreen },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);
const AuthStack = createStackNavigator(
  { Login: LoginScreen, Registration: RegistScreen },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
