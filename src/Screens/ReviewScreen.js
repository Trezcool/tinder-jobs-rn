import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { Link } from '../components/common';

class ReviewScreen extends Component {
  static navigationOptions = {
    title: 'Review',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="favorite" size={30} color={tintColor} />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Deck</Text>
        <Link
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate('Settings')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { ReviewScreen };
