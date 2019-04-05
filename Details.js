import React, {Component} from "react";
import {Text, View, FlatList, AsyncStorage} from "react-native";

import Api from "./Api";

import {ListItem, Icon} from "react-native-elements";

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      episodesWatched: {},
    };
    this.seriesId = props.navigation.state.params.id;
    this.seriesSaved = {};
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam("title"),
      headerRight: (
        <Icon
          name="close"
          containerStyle={{paddingHorizontal: 15}}
          onPress={navigation.getParam("deleteSeriesFn")}
        />
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({deleteSeriesFn: this.deleteSeriesFn});
    AsyncStorage.getItem("seriesSaved").then(series => {
      this.seriesSaved = JSON.parse(series);
      this.setState({episodesWatched: this.seriesSaved[this.seriesId].episodes});
    });
    Api.getSeriesDetails(this.seriesId)
      .then(response => this.setState({episodes: response.data}))
      .catch(error => console.log("getSeriesDetails error", error));
  }

  componentWillUnmount() {
    if (this.seriesSaved[this.seriesId]) {
      this.seriesSaved[this.seriesId].episodes = this.state.episodesWatched;
    }
    AsyncStorage.setItem("seriesSaved", JSON.stringify(this.seriesSaved));
    this.props.navigation.state.params.callbackFn();
  }

  deleteSeriesFn = () => {
    this.seriesSaved[this.seriesId] = undefined;
    this.props.navigation.pop();
  };

  _handleCheckboxPress = item => {
    this.seriesSaved[this.seriesId].episodes[item.id] = !this.seriesSaved[this.seriesId].episodes[item.id] || undefined;
    this.setState({episodesWatched: this.seriesSaved[this.seriesId].episodes})
  };

  _renderSeparator() {
    return <View style={[{borderBottomWidth: 1, borderBottomColor: "gray"}]}/>;
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
          onPress: () => this._handleCheckboxPress(item),
          checked: !!this.state.episodesWatched[item.id],
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
        ItemSeparatorComponent={this._renderSeparator}
        keyExtractor={item => item.id.toString()}
      />
    );
  }
}