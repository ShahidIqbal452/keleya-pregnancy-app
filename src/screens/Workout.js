import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Picker} from '@react-native-picker/picker';
import MainRectBtn from '../components/MainRectBtn';
import {widthPercentageToDP as wp} from '../utility/ResponsiveScreen';
import Icons from '../assets';
import Colors from '../utility/colors';

const Workout = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selectedWorkout, setSelectedWorkout] = useState();
  const workouts = [
    t('workout.once'),
    t('workout.two'),
    t('workout.three'),
    t('workout.four'),
    t('workout.five'),
    t('workout.six'),
    t('workout.seven'),
  ];
  return (
    <View style={styles.mainCont}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={Icons.workImage}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Icons.backIcon} style={styles.backIcon(insets.top)} />
        </Pressable>
        <Text style={styles.text}>{t('workout.title')}</Text>
      </ImageBackground>
      <View style={styles.bottomCont(insets.bottom)}>
        <Picker
          style={styles.pickerStyle}
          selectedValue={selectedWorkout}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedWorkout(itemValue)
          }>
          {workouts.map((option, index) => {
            return (
              <Picker.Item
                key={option + index.toString()}
                label={option}
                value={option}
              />
            );
          })}
        </Picker>
        <MainRectBtn
          title={t('name.btnTitle')}
          onPress={() => {
            navigation.navigate('Success');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
  bgImage: {
    width: '100%',
    aspectRatio: 0.8,
  },
  backIcon: top => ({
    width: wp('33'),
    aspectRatio: 1,
    resizeMode: 'contain',
    paddingLeft: wp('16'),
    marginTop: top,
  }),
  bottomCont: bottom => ({
    position: 'absolute',
    bottom: bottom,
    alignItems: 'center',
  }),
  text: {
    marginTop: wp(2),
    fontSize: 21,
    textAlign: 'center',
    color: Colors.GREYISH_BROWN,
  },
  pickerStyle: {
    width: '100%',
  },
});

export default Workout;
