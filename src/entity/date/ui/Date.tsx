import { StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { ClockIcon } from '@/shared/ui/icons/ClockIcon.tsx';

type DateProps = {
  date: string;
};

const color = '#777';

export const Date = (props: DateProps) => {
  const { date } = props;

  return (
    <View style={styles.container}>
      <View style={{ width: 16, height: 16 }}>
        <ClockIcon color={color} />
      </View>
      <Text style={styles.text}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: moderateScale(12),
    color: color,
    marginLeft: 4,
  },
});
