import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { MapView } from 'expo';
import { Button, Icon } from 'react-native-elements';

import { Spinner } from '../components/common';

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
    }
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
        <View style={styles.buttonContainer}>
          <Button
            raised
            title="Search This Area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.onButtonPress}
            buttonStyle={{borderRadius: 5, height: 50}}
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 8, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: 'transparent',
  }
});

export { MapScreen };
