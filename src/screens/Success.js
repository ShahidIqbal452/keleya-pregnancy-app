import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MainRectBtn from '../components/MainRectBtn';
import {widthPercentageToDP as wp} from '../utility/ResponsiveScreen';
import Icons from '../assets';
import Colors from '../utility/colors';
import KelVideoPlayer from '../module';

const Success = () => {
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  const playVideo = () => {
    if (Platform.OS === 'ios') {
      KelVideoPlayer.playVideo(
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      ).then(response => {});
    }
  };

  return (
    <ImageBackground
      style={styles.mainCont}
      resizeMode="cover"
      source={Icons.successImage}>
      <Image source={Icons.bellIcon} style={styles.bellIcon(insets.top)} />
      <Text style={[styles.text, {marginTop: wp('3')}]}>
        {t('success.title')}
      </Text>
      <View style={styles.bottomCont(insets.bottom)}>
        <Text style={styles.skip}>{t('success.skip')}</Text>
        <MainRectBtn
          title={t('success.btnTitle')}
          onPress={() => playVideo()}
        />
      </View>
    </ImageBackground>
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
    aspectRatio: 0.4,
  },
  bellIcon: top => ({
    width: wp('10'),
    resizeMode: 'contain',
    marginTop: top + wp('8'),
  }),
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
  skip: {
    marginBottom: wp('8'),
    fontSize: 17,
    textAlign: 'center',
    color: Colors.GREYISH_BROWN,
  },
});

export default Success;
