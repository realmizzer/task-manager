import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ClockIcon } from '@/shared/ui/icons/ClockIcon';
import { useTheme } from '@/shared/theme/useTheme';

type DateProps = {
  date: string;
};

export const Date = (props: DateProps) => {
  const { date } = props;

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={{ width: 16, height: 16 }}>
        <ClockIcon color={colors.hint} />
      </View>
      <Text
        style={[
          styles.text,
          {
            color: colors.hint,
          },
        ]}
      >
        {date}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(12),
    marginLeft: 4,
  },
});
