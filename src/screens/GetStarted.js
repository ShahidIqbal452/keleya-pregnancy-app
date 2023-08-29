import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MainRectBtn from '../components/MainRectBtn';
import Dots from '../components/Dots';
import Icons from '../assets';
import Colors from '../utility/colors';

const scrHeight = Dimensions.get('window').height;
const scrWidth = Dimensions.get('window').width;

const GetStarted = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.mainCont}
      resizeMode="cover"
      source={Icons.introImage}>
      <View style={styles.centerCont}>
        <Image source={Icons.mainIcon} style={styles.iconImage} />
        <Text style={styles.text}>{t('intro.title')}</Text>
      </View>
      <View style={styles.bottomCont(insets.bottom)}>
        <MainRectBtn
          title={t('intro.getStarted')}
          onPress={() => {
            navigation.navigate('SignUpEmail');
          }}
        />
        <Text
          style={styles.loginText}
          onPress={() => {
            navigation.navigate('SignInEmail');
          }}>
          {t('intro.or')}
        </Text>
        <Dots size={12} count={3} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    flex: 1,
    alignItems: 'center',
  },
  centerCont: {
    marginTop: scrHeight * 0.1,
    alignItems: 'center',
  },
  bottomCont: bottom => ({
    position: 'absolute',
    bottom: bottom,
    alignItems: 'center',
  }),
  iconImage: {
    width: scrWidth * 0.28,
    height: scrWidth * 0.28,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 8,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.GREYISH_BROWN,
  },
  loginText: {
    marginVertical: 18,
    fontSize: 18,
    color: Colors.GREYISH_BROWN,
  },
});

export default GetStarted;
