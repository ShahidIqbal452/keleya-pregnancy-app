import React from 'react';
import {Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Colors from '../utility/colors';
import {ButtonProps} from '../Interface';

const scrWidth = Dimensions.get('window').width;

const MainRectBtn: React.FC<ButtonProps> = ({
  title,
  onPress,
  width = scrWidth * 0.75,
  isActive = true,
  activeColor = Colors.PALE_TEAL,
  inactiveColor = Colors.WARM_GREY,
}) => {
  return (
    <Pressable
      style={[
        styles.conatiner,
        {backgroundColor: isActive ? activeColor : inactiveColor, width: width},
      ]}
      disabled={!isActive}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    color: Colors.WHITE,
  },
});

export default MainRectBtn;
