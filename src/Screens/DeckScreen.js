import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Jobs</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { DeckScreen };
