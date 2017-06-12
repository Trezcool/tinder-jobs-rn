import React, { Component } from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';
import * as Animatable from 'react-native-animatable';
import { Button, Card, Icon } from 'react-native-elements';

import jobs from './jobs.json';

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Favorites',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="favorite" size={30} color={tintColor} />
    ),
    headerRight: (
      <Button
        title=""
        icon={{ name: 'settings', color: '#45B39D', size: 24 }}
        onPress={() => navigation.navigate('Settings')}
        backgroundColor="transparent"
      />
    ),
  });

  renderLikedJob({ item }) {
    const { company, formattedRelativeTime, url, longitude, latitude, jobtitle } = item;

    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={jobtitle}>
        <View style={{ height: 200 }}>
          <MapView
            provider="google"
            initialRegion={initialRegion}
            style={{ flex: 1 }}
            scrollEnabled={false}
            cacheEnabled
          />
          <View style={styles.detailWrapper}>
            <Text style={styles.italics}>{company}</Text>
            <Text style={styles.italics}>{formattedRelativeTime}</Text>
          </View>
          <Button
            raised
            title="Apply Now!"
            backgroundColor="#009688"
            onPress={() => Linking.openURL(url)}
            buttonStyle={{borderRadius: 5}}
          />
        </View>
      </Card>
    );
  }

  render() {
    return (
      <Animatable.View animation="slideInUp" style={styles.container}>
        <FlatList
          data={jobs}
          keyExtractor={job => job.jobkey}
          renderItem={this.renderLikedJob}
        />
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  italics: {
    fontStyle: 'italic'
  }
});

export { ReviewScreen };
