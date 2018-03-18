import React, { Component } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

import slide1_png from '../../src/assets/img/slide1.png';
import slide2_png from '../../src/assets/img/slide2.png';
import slide3_png from '../../src/assets/img/slide3.png';

const SLIDE_DATA = [{
  key: 1,
  title: 'Welcome!',
  text: 'JobCool, the app you need',
  image: slide1_png,
  imageStyle: {
    height: 150,
    width: 150,
  },
  textStyle: {
    color: '#fff'
  },
  backgroundColor: '#03A9F4',
  level: 10,
}, {
  key: 2,
  title: 'Find Job',
  text: 'Use this to get a job',
  image: slide2_png,
  imageStyle: {
    height: 150,
    width: 150,
  },
  textStyle: {
    color: '#fff'
  },
  backgroundColor: '#03A9F4',
  level: 10,
}, {
  key: 3,
  title: 'Enjoy',
  text: 'Set your location, then swipe away',
  image: slide3_png,
  imageStyle: {
    height: 150,
    width: 150,
  },
  textStyle: {
    color: '#fff'
  },
  backgroundColor: '#03A9F4',
  level: 10,
}];

class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const { onDone } = this.props;

    return (
      <AppIntroSlider
        slides={SLIDE_DATA}
        onDone={onDone}
        showSkipButton={false}
        customStyles={{description: { fontSize: 18 }}}
      />
    );
  }
}

export { WelcomeScreen };
