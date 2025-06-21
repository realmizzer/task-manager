import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { PropsWithChildren } from 'react';
import { useTheme } from '@/shared/theme/useTheme.ts';
import { moderateScale } from 'react-native-size-matters';

type ButtonProps = {
  text?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?(): void;
};

export const Button = (props: PropsWithChildren<ButtonProps>) => {
  const { children, text, containerStyle, textStyle, onPress } = props;

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
        },
        containerStyle,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      {children}
      <Text
        style={[
          styles.text,
          {
            color: colors.white,
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  text: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: 500,
    textAlign: 'center',
  },
});
