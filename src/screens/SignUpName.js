import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import KeleyaField from '../components/KeleyaField';
import MainRectBtn from '../components/MainRectBtn';
import Icons from '../assets';
import Colors from '../utility/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utility/ResponsiveScreen';

const SignUpName = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [validated, setValidated] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => {
        setScrollOffset(-hp(20)); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setScrollOffset(0); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setValidated(name.length > 0);
  }, [name]);

  return (
    <View style={styles.mainCont}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="cover"
        source={Icons.nameImage}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Icons.backIcon} style={styles.backIcon(insets.top)} />
        </Pressable>
      </ImageBackground>
      <View
        style={[styles.centerContainer, {marginTop: wp('5') + scrollOffset}]}>
        <Text style={[styles.text, {marginBottom: wp(3)}]}>
          {t('name.title')}
        </Text>
        <KeleyaField
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.bottomCont(insets.bottom)}>
        <MainRectBtn
          isActive={validated}
          title={t('name.btnTitle')}
          onPress={() => {
            navigation.navigate('DateScreen', {
              name: name,
            });
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
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    aspectRatio: 0.76,
    shadowColor: '#bbb',
    shadowOffset: {width: 8, height: 8},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
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
});

export default SignUpName;
