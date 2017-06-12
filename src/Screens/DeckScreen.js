import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';

import Swipe from '../components/Swipe';
import jobs from './jobs.json'

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="description" size={30} color={tintColor} />
    )
  };

  renderCard = job => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 300 }}>
          <MapView
            provider="google"
            initialRegion={initialRegion}
            style={{ flex: 1 }}
            scrollEnabled={false}
            cacheEnabled
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    );
  };

  renderNoMoreCards = () => {
    return (
      <Card title="No More Jobs">
        <Button
          raised
          title="Back To Map"
          backgroundColor="#009688"
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('Map')}
          buttonStyle={{borderRadius: 5, height: 50}}
        />
      </Card>
    );
  };

  render() {
    console.log(this.props.navigation.state);
    const { navigation: { state: { params } } } = this.props;
    return (
      <View style={styles.container}>
        <Swipe
          data={jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => {}}  // like job
          keyProp="jobkey"
          reset={params && params.reload || false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 10
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
});

export { DeckScreen };
