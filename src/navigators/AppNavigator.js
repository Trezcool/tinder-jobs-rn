import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import { DeckScreen, MapScreen, ReviewScreen, SettingsScreen } from '../Screens';

const AppNavigator = TabNavigator({
  Map: { screen: MapScreen },
  Deck: { screen: DeckScreen },
  Review: {
    screen: StackNavigator({
      Review: { screen: ReviewScreen },
      Settings: { screen: SettingsScreen },
    }, {
      navigationOptions: {
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
