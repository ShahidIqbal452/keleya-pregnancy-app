import {GestureResponderEvent, StyleProp, TextStyle} from 'react-native/types';

export interface ButtonProps {
  title: string;
  width?: number;
  isActive?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  onPress?: any;
}

export interface DotProps {
  size: number;
  count: number;
  currentIndex?: number;
  activeColor?: string;
  inactiveColor?: string;
}
export interface BoxProps {
  text?: string;
  isActive?: boolean;
  textStyle?: StyleProp<TextStyle>;
  onPress: (event: GestureResponderEvent) => void;
}
