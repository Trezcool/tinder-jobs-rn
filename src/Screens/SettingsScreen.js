import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    tabBarTitle: 'Favorites',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="favorite" size={30} color={tintColor} />
    )
  };

  onButtonPress = () => {
    const { navigation, clearJobs } = this.props;
    clearJobs();
    navigation.goBack(null);
  };

  render() {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <Button
          raised
          title="Reset Liked Jobs"
          backgroundColor="#F44336"
          icon={{name: 'delete-forever'}}
          onPress={this.onButtonPress}
          buttonStyle={{borderRadius: 5, height: 50}}
        />
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
