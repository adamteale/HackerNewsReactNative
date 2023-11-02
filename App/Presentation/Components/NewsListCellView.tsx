import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {NewsItem} from '../../Domain/Entity/NewsItem';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useRef} from 'react';

import {RectButton} from 'react-native-gesture-handler';

type NewsListCellViewProps = {
  newsItem: NewsItem;
  onDelete: (item: NewsItem) => void;
  onPress: () => void;
};

export const NewsListCellView = ({props}: {props: NewsListCellViewProps}) => {
  const updateRef = useRef();

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<number>,
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          style={[swipeStyles.rightAction, {backgroundColor: color}]}
          onPress={() => props.onDelete(props.newsItem)}>
          <Text style={swipeStyles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    _dragAnimatedValue: Animated.AnimatedInterpolation<number>,
  ) => (
    <View
      style={{
        width: 120,
        flexDirection: 'row',
      }}>
      {renderRightAction('Delete', 'red', 120, progress)}
    </View>
  );

  return (
    <Swipeable
      ref={updateRef.current}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={direction => {
        console.log(`Opening swipeable from the ${direction}`);
      }}
      onSwipeableClose={direction => {
        console.log(`Closing swipeable to the ${direction}`);
      }}>
      <Pressable onPress={() => props.onPress()}>
        <View style={styles.newsListCellViewContainer} key={props.newsItem.id}>
          <Text style={styles.articleTitle}>{props.newsItem.title}</Text>
          <Text style={styles.dateAndAuthor}>
            {props.newsItem.author} - {props.newsItem.createdAt.toString()}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  newsListCellViewContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
  },
  articleTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  dateAndAuthor: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'row',
    fontSize: 14,
  },
});

const swipeStyles = StyleSheet.create({
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
