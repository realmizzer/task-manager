import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '@/shared/theme/useTheme.ts';
import { moderateScale } from 'react-native-size-matters';

type LabelInputProps = {
  label?: string;
  value?: string;
  multiline?: boolean;
  onChangeText?(text: string): void;
};

export const LabelInput = (props: LabelInputProps) => {
  const { label, value, multiline, onChangeText } = props;

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        multiline={multiline}
        style={[
          styles.input,
          {
            backgroundColor: colors.input,
            height: multiline ? moderateScale(150) : 'auto',
          },
        ]}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontWeight: 500,
    fontSize: moderateScale(20),
    marginBottom: 8,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: moderateScale(16),
  },
});
