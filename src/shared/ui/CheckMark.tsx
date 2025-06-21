import { StyleSheet, TouchableOpacity } from 'react-native';
import { CheckMarkIcon } from '@/shared/ui/icons/CheckMarkIcon.tsx';

const SIZE = 32;

type CheckMarkProps = {
  checked: boolean;
  onPress?(): void;
};

const color = '#81c55c';

export const CheckMark = (props: CheckMarkProps) => {
  const { checked, onPress } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: checked ? color : 'transparent',
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
    borderColor: color,
    borderWidth: 2,
    padding: 4,
  },
});
