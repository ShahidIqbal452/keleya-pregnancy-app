import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MainRectBtn from '../components/MainRectBtn';
import Icons from '../assets';
import Colors from '../utility/colors';
import {widthPercentageToDP as wp} from '../utility/ResponsiveScreen';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const DateScreen = ({route}) => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {name} = route.params;

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.mainCont}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={Icons.dateImage}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Icons.backIcon} style={styles.backIcon(insets.top)} />
        </Pressable>
      </ImageBackground>
      <View style={[styles.centerContainer, {marginTop: -wp('22')}]}>
        <Text style={[styles.text, {marginBottom: wp(2)}]}>
          {t('date.title') + name + '?'}
        </Text>
        <Text
          style={styles.dateText}
          onPress={() => {
            setOpen(true);
          }}>
          {moment(date).format('MMM DD, YYYY')}
        </Text>
      </View>
      <View style={styles.bottomCont(insets.bottom)}>
        <MainRectBtn
          title={t('name.btnTitle')}
          onPress={() => {
            navigation.navigate('Workout');
          }}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode={'date'}
        onConfirm={updatedDate => {
          setOpen(false);
          setDate(updatedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
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
    aspectRatio: 0.6,
  },
  backIcon: top => ({
    width: wp('33'),
    aspectRatio: 1,
    resizeMode: 'contain',
    paddingLeft: wp('16'),
    marginTop: top,
  }),
  centerContainer: {
    marginHorizontal: wp('6'),
    alignItems: 'center',
  },
  bottomCont: bottom => ({
    position: 'absolute',
    bottom: bottom,
    alignItems: 'center',
  }),
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: Colors.GREYISH_BROWN,
  },
  dateText: {
    overflow: 'hidden',
    borderRadius: wp(2),
    marginTop: wp(5),
    paddingHorizontal: wp(2.5),
    paddingVertical: wp(1.5),
    fontSize: 14,
    textAlign: 'center',
    color: Colors.BLUE,
    backgroundColor: Colors.LIGHT_GREY,
  },
});

export default DateScreen;
