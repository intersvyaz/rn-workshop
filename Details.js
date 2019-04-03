import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
    };
  }

  static navigationOptions = () => {
    return {
      title: "Эпизоды",
    }
  };

  componentDidMount() {
    console.log("Details");
  }

  _renderFooter() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{paddingTop: 30, fontSize: 20}}>
          {"Welcome to React Native!"}
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
        data={this.state.episodes}
        extraData={this.state}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderFooter}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}