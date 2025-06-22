import { StyleSheet, Text, View } from 'react-native';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon.tsx';
import { useTheme } from '@/shared/theme/useTheme.ts';

type TodoStatusProps = {};

export const TaskImportant = (props: TodoStatusProps) => {
  const {} = props;

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ width: 16, height: 16 }}>
        <ExclamationMarkIcon color={colors.important} />
      </View>
      <Text
        style={[
          styles.text,
          {
            color: colors.important,
          },
        ]}
      >
        ВАЖНО
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#dce4fa',
    borderRadius: 4,
  },
  text: {},
});
