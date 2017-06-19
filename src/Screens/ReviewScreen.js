import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapView, WebBrowser } from 'expo';
import * as Animatable from 'react-native-animatable';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import { deleteJob } from '../actions';

const SCREEN_WIDTH = Dimensions.get('window').width;

class ReviewScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Favorites',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="favorite" size={30} color={tintColor} />
    ),
    headerRight: (
      <Button
        title=""
        icon={{ name: 'settings', color: '#00B5AD', size: 24 }}
        onPress={() => navigation.navigate('Settings')}
        backgroundColor="transparent"
      />
    ),
  });

  renderLikedJob({ item }) {
    const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = item;

    const initialRegion = {
      longitude,
      latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <View key={jobkey}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => this.props.deleteJob(jobkey)}
        >
          <Icon name="delete-forever" size={30} color="#F44336" />
        </TouchableOpacity>

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
              backgroundColor="#00B5AD"
              onPress={async () => await WebBrowser.openBrowserAsync(url)}
              buttonStyle={{borderRadius: 5}}
            />
          </View>
        </Card>
      </View>
    );
  }

  renderNoLikedJobs() {
    return (
      <Card title="No Liked Jobs">
        <Button
          raised
          title="Back To Map"
          backgroundColor="#00B5AD"
          icon={{ name: 'my-location' }}
          onPress={() => this.props.navigation.navigate('Map')}
          buttonStyle={{borderRadius: 5, height: 50}}
        />
      </Card>
    );
  }

  renderLikedJobs() {
    const { jobs } = this.props;

    return jobs.length ? jobs.map(item => this.renderLikedJob({ item })) : this.renderNoLikedJobs();
  }

  render() {
    // FIXME: FlatList only loads upon interaction.. and also isn't animatable.. :(
    return (
      <Animatable.View animation="slideInUp" style={styles.container}>
        <ScrollView>
          {this.renderLikedJobs()}
        </ScrollView>
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
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    left: SCREEN_WIDTH - 45,
    zIndex: 900,
    elevation: 5
  }
});

const mapStateToProps = ({ likedJobs }) => {
  return { jobs: likedJobs }
};

export default connect(mapStateToProps, { deleteJob })(ReviewScreen);
