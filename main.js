import 'expo';
import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';

import { store, persistor } from './src/store';
import AppNavigator from './src/navigators/AppNavigator';
import { Spinner } from './src/components/common';
import { cacheImages } from './src/utils';

import { WelcomeScreen } from './src/Screens';

import app_png from './src/assets/icons/app.png';
import slide1_png from './src/assets/img/slide1.png';
import slide2_png from './src/assets/img/slide2.png';
import slide3_png from './src/assets/img/slide3.png';

export default class App extends Component {
  state = {
    token: false,
    appIsReady: false,
  };

  componentDidMount() {
    //noinspection JSIgnoredPromiseFromCall
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      app_png,
      slide1_png,
      slide2_png,
      slide3_png,
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
    ) : <Spinner color="#00B5AD" />;
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {this.renderView()}
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

Expo.registerRootComponent(App);
