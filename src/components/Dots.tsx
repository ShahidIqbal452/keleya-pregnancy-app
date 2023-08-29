import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../utility/colors';
import {DotProps} from '../Interface';

const Dots: React.FC<DotProps> = ({
  size,
  count,
  currentIndex = 0,
  activeColor = Colors.PALE_TEAL,
  inactiveColor = Colors.LIGHT_TEAL,
}) => {
  const dots = Array(count).fill(0);
  return (
    <View style={styles.conatiner}>
      {dots.map((currElement, index) => {
        return (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              marginRight: index === count - 1 ? 0 : 8,
              backgroundColor:
                index === currentIndex ? activeColor : inactiveColor,
            }}
            key={index}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dots;
