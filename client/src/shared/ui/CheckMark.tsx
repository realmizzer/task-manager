import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckMarkIcon } from '@/shared/ui/icons/CheckMarkIcon';
import { useTheme } from '@/shared/theme/useTheme';

const SIZE = 32;

type CheckMarkProps = {
  checked: boolean;
  onPress?(): void;
};

export const CheckMark = (props: CheckMarkProps) => {
  const { checked, onPress } = props;

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: checked ? colors.success : 'transparent',
          borderColor: colors.success,
        },
      ]}
    >
      <CheckMarkIcon color={'#FFF'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 2,
    padding: 4,
  },
});
