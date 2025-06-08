import {
  Pressable,
  PressableProps,
  TouchableOpacity,
  TouchableOpacityProps
} from 'react-native';

export type AnimatedButtonProps = { animated: true } & TouchableOpacityProps;
export type NonAnimatedButtonProps = { animated?: false } & PressableProps;

export type ButtonProps = AnimatedButtonProps | NonAnimatedButtonProps;

export const Button = ({ animated, ...rest }: ButtonProps) =>
  animated ? (
    <TouchableOpacity {...(rest as TouchableOpacityProps)} />
  ) : (
    <Pressable {...(rest as PressableProps)} />
  );
