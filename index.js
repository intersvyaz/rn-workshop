import React from "react";
import {AppRegistry} from "react-native";
import {createStackNavigator, createAppContainer} from "react-navigation";

import Home from "./Home";
import Search from "./Search";
import Details from "./Details";

const StackNavigator = createStackNavigator({
  Home: {screen: Home},
  Search: {screen: Search},
  Details: {screen: Details},
});

const AppContainer = createAppContainer(StackNavigator);

class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}

AppRegistry.registerComponent("show_tracker", () => App);