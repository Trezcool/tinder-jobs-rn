import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { DeckScreen, MapScreen, ReviewScreen, SettingsScreen } from '../Screens';

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    borderColor: '#45B39D',
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
        headerTintColor: '#45B39D',
      }
    })
  },
}, {
  backBehavior: 'none',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tabBarVisible: true,
    activeTintColor: '#45B39D',
    labelStyle: { fontSize: 12 },
    showIcon: true,
  },
  lazyLoad: true
});
export default AppNavigator;
