import React, {Component} from "react";
import {Text, View, FlatList, TextInput} from "react-native";

import Api from "./Api";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      searchText: "",
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

  _handleSubmitEditing = () => {
    Api.searchSeries(this.state.searchText)
      .then(response => this.setState({series: response.data}))
      .catch(error => console.log("searchSeries error", error));
  };

  _handleTextChange = text => this.setState({searchText: text});

  _renderHeader = () => {
    return (
      <TextInput
        placeholder={"Введите название сериала"}
        onChangeText={this._handleTextChange}
        onSubmitEditing={this._handleSubmitEditing}
        style={{margin: 30, fontSize: 20, borderColor: "grey", padding: 10, borderWidth: 2, borderRadius: 5}}
      />
    );
  };

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
        ListHeaderComponent={this._renderHeader}
        ListEmptyComponent={this._renderFooter}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}