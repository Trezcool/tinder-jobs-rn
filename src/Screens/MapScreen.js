import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Location, MapView, Permissions } from 'expo';
import { Button, FormInput, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
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
    loading: false,
    region: {
      longitude: 18.506891,
      latitude: -33.813459,
      longitudeDelta: 0.006,
      latitudeDelta: 0.02,
    },
    term: '',
  };

  componentDidMount() {
    this.setRegionToCurrentLocation();
  }

  async setRegionToCurrentLocation() {
    // ask for permission first
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      // get location
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
      // update region
      if (latitude && longitude) {
        const { region } = this.state;
        this.setState({region: { ...region, latitude, longitude }});
      }
    } else {
      console.log('Location permission denied!');
    }
  }

  onButtonPress = () => {
    // fetch jobs
    const { navigation, nextPage, q, searchJobs } = this.props;
    const { term, region } = this.state;
    const page = term === q ? nextPage : 0;  // reset page if term changes
    this.setState({ loading: true });
    searchJobs(term, region, page, () => {
      this.setState({ loading: false });
      navigation.navigate('Deck');
    });
  };

  renderView() {
    const { mapLoaded, loading, region, term } = this.state;

    if (!mapLoaded || loading) return <Spinner color="#45B39D" />;

    return (
      <View style={{flex: 1}}>
        <MapView
          provider="google"
          region={region}
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          style={{ flex: 1 }}
          onRegionChangeComplete={region => this.setState({ region })}
        />

        <FormInput
          placeholder="Enter Search Term"
          value={term}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onChangeText={term => this.setState({ term })}
          // onSubmitEditing={this.onButtonPress}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
  },
  inputContainer: {
    position: 'absolute',
    padding: 5,
    top: 50,
    left: 0,
    right: 0,
    shadowColor: '#009688',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 5,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
      },
    }),
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
  },
  button: {
    borderRadius: 30,
    height: 60,
    width: 60,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 9,
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

const mapStateToProps = ({ jobs }) => {
  const { nextPage, q } = jobs;
  return { nextPage, q }
};

export default connect(mapStateToProps, actions)(MapScreen);
