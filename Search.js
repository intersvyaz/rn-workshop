import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
    };
  }

  static navigationOptions = () => {
    return {
      title: "Поиск",
    }
  };

  componentDidMount() {
    console.log("Search");
  }

  _renderFooter() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{paddingTop: 30, fontSize: 20}}>
          {"Пока ничего не найдено"}
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