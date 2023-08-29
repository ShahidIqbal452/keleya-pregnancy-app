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
import {isValidEmail} from '../utility/helper';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import AppActions from '../store/actions/app';

const SignInEmail = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const appState = useSelector(
    ({app}) => ({
      email: app.email,
    }),
    shallowEqual,
  );

  const [email, setEmail] = useState(appState.email);
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setScrollOffset(-hp(3)); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
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
    setValidated(isValidEmail(email) && password.length > 7);
  }, [email, password]);

  return (
    <View style={styles.mainCont}>
      <ImageBackground
        style={styles.bgImage}
        resizeMode="contain"
        source={Icons.signUpImage}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={Icons.backIcon} style={styles.backIcon(insets.top)} />
        </Pressable>
      </ImageBackground>
      <View
        style={[styles.centerContainer, {marginTop: -wp('12') + scrollOffset}]}>
        <Text style={[styles.text, {marginBottom: wp(2)}]}>
          {t('login.title')}
        </Text>
        <KeleyaField
          placeholder="example@gmail.com"
          value={email}
          fieldType={'email'}
          onChangeText={setEmail}
        />
        <KeleyaField
          secureTextEntry
          placeholder={t('signup.fieldPassword')}
          containerStyle={{
            marginTop: wp(4),
          }}
          value={password}
          fieldType={'password'}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.bottomCont(insets.bottom)}>
        <Text style={[styles.text, styles.forgot]}>
          {t('login.forgotPass')}
        </Text>
        <MainRectBtn
          isActive={validated}
          title={t('login.btnTitle')}
          onPress={() => {
            dispatch(AppActions.saveEmail(email));
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
    aspectRatio: 0.96,
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
  forgot: {
    marginBottom: wp(5),
    fontSize: 15,
  },
});

export default SignInEmail;
