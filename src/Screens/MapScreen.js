import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { Button, FormInput, Icon } from 'react-native-elements';

import { Spinner } from '../components/common';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MapScreen extends Component {
  static navigationOptions = {
    title: 'Map',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="my-location" size={30} color={tintColor} />
    )
  };

  state = {
    mapLoaded: true,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    },
    term: '',
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };

  onButtonPress = () => {
    // fetch jobs
    const { navigation } = this.props;
    navigation.navigate('Deck', {reload: true});
  };

  render() {
    if (!this.state.mapLoaded) return <Spinner color="#45B39D" />;

    return (
      <View style={styles.container}>
        <MapView
          provider="google"
          region={this.state.region}
          style={{ flex: 1 }}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />

        <FormInput
          placeholder="Enter search term"
          value={this.state.term}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={term => this.setState({ term })}
          containerStyle={styles.inputContainer}
        />

        <View style={styles.buttonContainer}>
          <Button
            raised
            title=""
            backgroundColor="#009688"
            icon={{ name: 'search', size: 24 }}
            onPress={this.onButtonPress}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    position: 'absolute',
    padding: 5,
    top: 50,
    left: 0,
    right: 0,
    shadowColor: '#009688',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 2,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
      },
    }),
  },
  button: {
    borderRadius: 30,
    height: 60,
    width: 60,
    paddingLeft: 18,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: SCREEN_WIDTH/2 - 45,
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.4,
    shadowRadius: 30,
    borderRadius: 30,
    elevation: 2,
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
  }
});

export { MapScreen };
