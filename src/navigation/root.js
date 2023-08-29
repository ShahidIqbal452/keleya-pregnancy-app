import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GetStarted from '../screens/GetStarted';
import SignUpEmail from '../screens/SignUpEmail';
import SignInEmail from '../screens/SignInEmail';
import SignUpName from '../screens/SignUpName';
import DateScreen from '../screens/DateScreen';
import Workout from '../screens/Workout';
import Success from '../screens/Success';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={GetStarted} />
        <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
        <Stack.Screen name="SignInEmail" component={SignInEmail} />
        <Stack.Screen name="SignUpName" component={SignUpName} />
        <Stack.Screen name="DateScreen" component={DateScreen} />
        <Stack.Screen name="Workout" component={Workout} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
