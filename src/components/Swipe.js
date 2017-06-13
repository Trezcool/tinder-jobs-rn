import React, { Component } from 'react';
import { Animated, Dimensions, LayoutAnimation, PanResponder, UIManager, View } from 'react-native';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export default class Swipe extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {},
    keyProp: 'id'
  };

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe('left');
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  forceSwipe = direction => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  };

  onSwipeComplete = direction => {
    const { index, position } = this.state;
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({ x: 0, y: 0 });
    this.setState({ index: index + 1 });
  };

  resetPosition = () => {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  };

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    const { index, panResponder } = this.state;
    const { data, keyProp, renderCard, renderNoMoreCards } = this.props;

    if (index >= data.length) return renderNoMoreCards();

    const deck = data.map((item, i) => {
      if (i < index) return;

      if (i === index) {
        return (
          <Animated.View
            key={item[keyProp]}
            style={[this.getCardStyle(), styles.card, { zIndex: 99 }]}
            {...panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={item[keyProp]}
          style={[styles.card, { top: 10 * (i - index), zIndex: -i }]}
        >
          {renderCard(item)}
        </Animated.View>
      );
    });
    // return Platform.OS === 'android' ? deck : deck.reverse();
    return deck.reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

const styles = {
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};
