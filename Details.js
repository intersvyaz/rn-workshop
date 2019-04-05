import React, {Component} from "react";
import {Text, View, FlatList} from "react-native";

import Api from "./Api";

import {ListItem} from "react-native-elements";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
    };
    this.seriesId = props.navigation.state.params.id;
  }

  static navigationOptions = () => {
    return {
      title: "Эпизоды",
    }
  };

  componentDidMount() {
    Api.getSeriesDetails(this.seriesId)
      .then(response => this.setState({episodes: response.data}))
      .catch(error => console.log("getSeriesDetails error", error));
  }

  _renderFooter() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text style={{paddingTop: 30, fontSize: 20}}>
          {"Информация недоступна"}
        </Text>
      </View>
    );
  }

  _renderItem = ({item}) => {
    return (
      <ListItem
        title={"Cерия " + item.airedEpisodeNumber + ' "' + item.episodeName + '"'}
        leftAvatar={{rounded: false, size: "large", source: {uri: Api.getEpisodeImage(item.filename)}}}
        checkBox={{
          checkedColor: "black",
        }}
      />
    );
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