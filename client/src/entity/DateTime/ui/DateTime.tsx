import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ClockIcon } from '@/shared/ui/icons/ClockIcon';
import { useTheme } from '@/shared/theme/useTheme';

type DateProps = {
  date: number;
};

export const DateTime = (props: DateProps) => {
  const { date } = props;

  const { colors } = useTheme();

  const formattedDate = new Date(Number(date)).toLocaleString();

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
        {formattedDate}
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
