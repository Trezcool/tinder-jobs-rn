import React, { Component } from 'react';
import AppIntro from 'react-native-app-intro';

const SLIDE_DATA = [{
  title: 'Welcome!',
  description: 'JobCool, the app you need',
  img: require('../../src/assets/img/slide1.png'),
  imgStyle: {
    height: 150,
    width: 150,
  },
  backgroundColor: '#03A9F4',
  fontColor: '#fff',
  level: 10,
}, {
  title: 'Find Job',
  description: 'Use this to get a job',
  img: require('../assets/img/slide2.png'),
  imgStyle: {
    height: 150,
    width: 150,
  },
  backgroundColor: '#BB8FCE',
  fontColor: '#fff',
  level: 10,
}, {
  title: 'Enjoy',
  description: 'Set your location, then swipe away',
  img: require('../../src/assets/img/slide3.png'),
  imgStyle: {
    height: 150,
    width: 150,
  },
  backgroundColor: '#00B5AD',
  fontColor: '#fff',
  level: 10,
}];

class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { onDone } = this.props;

    return (
      <AppIntro
        onDoneBtnClick={onDone}
        pageArray={SLIDE_DATA}
        showSkipButton={false}
        customStyles={{description: { fontSize: 18 }}}
      />
    );
  }
}

export { WelcomeScreen };
