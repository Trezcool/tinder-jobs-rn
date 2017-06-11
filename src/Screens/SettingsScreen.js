import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class SettingsScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    tabBarTitle: 'Review',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export { SettingsScreen };
