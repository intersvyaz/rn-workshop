import React, {Component} from "react";
import {Text, View, FlatList, AsyncStorage} from "react-native";

import {Icon} from "react-native-elements";

import Api from "./Api";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: "Мои сериалы",
      headerRight: (
        <Icon
          name="add"
          containerStyle={{paddingHorizontal: 15}}
          onPress={() => navigation.navigate("Search")}
        />
      ),
    }
  };

  componentDidMount() {
    this.getSeriesSavedFn();
    Api.login()
      .then(response => Api.token = response.token)
      .catch(error => console.log("login error", error));
  }

  getSeriesSavedFn = () => {
    AsyncStorage.getItem("seriesSaved").then(series => {
      let seriesSaved = JSON.parse(series);
      if (seriesSaved === null) return;
      this.setState({series: Object.values(seriesSaved)})
    });
  };

  _renderFooter() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{paddingTop: 30, fontSize: 20}}>
          {"Пока ничего не добавлено"}
        </Text>
      </View>
    );
  }

  _renderItem = () => {
    return <View/>;
  };

  render() {
    return (
      <FlatList
        data={this.state.series}
        extraData={this.state}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderFooter}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}