import Expo from 'expo';
import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import { Spinner } from './src/components/common';
import { cacheImages } from './src/utils';

import { WelcomeScreen } from './src/Screens';

export default class App extends Component {
  state = {
    token: false,
    appIsReady: false,
  };

  componentWillMount() {
    //noinspection JSIgnoredPromiseFromCall
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/assets/icons/app.png'),
      require('./src/assets/icons/loading.png'),
      require('./src/assets/img/background.jpg'),
      require('./src/assets/img/slide1.png'),
      require('./src/assets/img/slide2.png'),
      require('./src/assets/img/slide3.png'),
    ]);

    await Promise.all([...imageAssets]);
    this.setState({appIsReady: true});
  }

  renderScreen = () => {
    return this.state.token ? <AppNavigator /> :
      <WelcomeScreen onDone={() => this.setState({token: true})} />;
  };

  renderView = () => {
    return this.state.appIsReady ? (
      <View style={styles.container}>
        {this.renderScreen()}
      </View>
    ) : <Spinner color="#45B39D" />;
  };

  render() {
    return this.renderView();
    // return (
    //   <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    //     {this.renderView()}
    //   </Provider>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

Expo.registerRootComponent(App);
