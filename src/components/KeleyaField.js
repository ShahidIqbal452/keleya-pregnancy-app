/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utility/colors';
import Icons from '../assets';
import {isValidEmail} from '../utility/helper';
import {widthPercentageToDP as wp} from '../utility/ResponsiveScreen';

const KeleyaField = props => {
  const {
    value,
    containerStyle,
    secureTextEntry,
    inputStyle,
    multiline,
    placeholder,
    autoFocus,
    disabled,
    keyboardType,
    fieldType,
    errorMessage,
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setFocused] = useState(autoFocus);
  const [errMsg, setErrMsg] = useState(errorMessage);
  const inputRef = useRef(null);

  return (
    <View>
      <View style={[styles.container, containerStyle]}>
        <TextInput
          ref={inputRef}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
          value={value ? value.toString() : ''}
          style={[
            styles.input,
            {
              textAlignVertical: multiline ? 'top' : 'center',
            },
            inputStyle,
          ]}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !showPassword}
          placeholder={placeholder}
          placeholderTextColor={Colors.WARM_GREY}
          keyboardType={keyboardType || 'default'}
          onFocus={() => {
            setFocused(true);
            setErrMsg('');
          }}
          onBlur={() => {
            setFocused(false);
            if (value.length > 0) {
              if (fieldType === 'email' && !isValidEmail(value)) {
                setErrMsg('Invalid Email');
              }
              if (fieldType === 'password' && value.length < 7) {
                setErrMsg('password must be atleast 8 characters long');
              }
            }
          }}
        />
        {secureTextEntry === true && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? Icons.showPass : Icons.hidePass}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: wp(85),
          height: isFocused ? wp(0.7) : wp(0.4),
          borderRadius: 2,
          backgroundColor: errMsg ? Colors.RED : Colors.GREYISH_BROWN,
        }}
      />
      {typeof errMsg === 'string' && errMsg.length > 0 && (
        <Text style={styles.errorStyle}>{errMsg}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },
  eyeIcon: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: wp(5.5),
    aspectRatio: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    color: Colors.BLACK,
  },
  errorStyle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.RED,
    textAlign: 'left',
  },
});

export default KeleyaField;
