import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import * as Animatable from 'react-native-animatable';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Swipe from '../components/Swipe';

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
      <Card
        title={job.jobtitle}
        containerStyle={{shadowColor: 'rgba(69, 179, 157, 0.3)'}}
        dividerStyle={{backgroundColor: 'rgba(69, 179, 157, 0.3)'}}
      >
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
          <Text style={styles.italics}>{job.company}</Text>
          <Text style={styles.italics}>{job.formattedRelativeTime}</Text>
        </View>
        <Text style={styles.snippet}>
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
    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInDown" style={styles.view}>
          <Swipe
            data={this.props.jobs}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={job => {}}  // like job
            keyProp="jobkey"
          />
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9E9EF',
  },
  view: {
    marginTop: 10
  },
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  italics: {
    fontStyle: 'italic',
    color: '#ABB2B9',
  },
  snippet: {
  }
});

const mapStateToProps = ({ jobs }) => {
  return { jobs: jobs.results }
};

export default connect(mapStateToProps, actions)(DeckScreen);
