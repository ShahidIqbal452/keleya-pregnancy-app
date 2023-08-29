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
import CheckBoxText from '../components/CheckBoxText';
import MainRectBtn from '../components/MainRectBtn';
import Icons from '../assets';
import Colors from '../utility/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../utility/ResponsiveScreen';
import {isValidEmail} from '../utility/helper';

const SignUpEmail = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setScrollOffset(-hp(6)); // or some other action
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
    setValidated(
      isValidEmail(email) && password.length > 7 && privacy && terms,
    );
  }, [email, password, privacy, terms]);

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
          {t('signup.title')}
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
        <View style={{marginTop: wp(4)}} />
        <CheckBoxText
          text={t('signup.privacy')}
          isActive={privacy}
          onPress={() => {
            setPrivacy(!privacy);
          }}
        />
        <CheckBoxText
          text={t('signup.terms')}
          isActive={terms}
          onPress={() => {
            setTerms(!terms);
          }}
        />
      </View>
      <View style={styles.bottomCont(insets.bottom)}>
        <MainRectBtn
          isActive={validated}
          title={t('signup.createAcc')}
          onPress={() => {
            navigation.navigate('SignUpName');
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
});

export default SignUpEmail;
