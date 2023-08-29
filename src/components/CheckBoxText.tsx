import React from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import Colors from '../utility/colors';
import Icons from '../assets';
import {BoxProps} from '../Interface';
import {widthPercentageToDP as wp} from '../utility/ResponsiveScreen';

const CheckBoxText: React.FC<BoxProps> = ({
  text = '',
  isActive = false,
  textStyle,
  onPress,
}) => {
  return (
    <View style={styles.conatiner}>
      <Pressable onPress={onPress}>
        <Image
          source={isActive ? Icons.check : Icons.uncheck}
          style={styles.boxIcon}
        />
      </Pressable>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginVertical: wp('2'),
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxIcon: {
    width: wp('5'),
    height: wp('5'),
  },
  text: {
    marginLeft: wp('5'),
    fontSize: 14,
    textAlign: 'left',
    color: Colors.BLACK,
  },
});

export default CheckBoxText;
