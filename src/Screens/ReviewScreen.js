import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Link } from '../components/common';

class ReviewScreen extends Component {
  static navigationOptions = {
    title: 'Review',
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
