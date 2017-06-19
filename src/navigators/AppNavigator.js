import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import DeckScreen from '../Screens/DeckScreen';
import MapScreen from '../Screens/MapScreen';
import ReviewScreen from '../Screens/ReviewScreen';
import SettingsScreen from '../Screens/SettingsScreen';

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    borderColor: '#00B5AD',
    shadowColor: '#6fb3ac',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative',
  }
});

const AppNavigator = TabNavigator({
  Map: { screen: MapScreen },
  Deck: { screen: DeckScreen },
  Favorites: {
    screen: StackNavigator({
      Review: { screen: ReviewScreen },
      Settings: { screen: SettingsScreen },
    }, {
      navigationOptions: {
        headerStyle: styles.header,
        headerTintColor: '#00B5AD',
      }
    })
  },
}, {
  backBehavior: 'none',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tabBarVisible: true,
    activeTintColor: '#00B5AD',
    labelStyle: { fontSize: 12 },
    showIcon: true,
  },
  lazyLoad: true
});
export default AppNavigator;
