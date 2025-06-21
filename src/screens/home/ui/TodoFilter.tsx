import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/shared/theme/useTheme.ts';
import { moderateScale } from 'react-native-size-matters';
import { ReactNode } from 'react';

type TodoFilterProps = {
  title: string;
  count: number;
  icon: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onPress?(): void;
};

export const TodoFilter = (props: TodoFilterProps) => {
  const { title, icon, count, containerStyle, onPress } = props;

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
        containerStyle,
      ]}
      onPress={onPress}
    >
      <View style={styles.top}>
        <View style={{ height: 30, width: 30 }}>{icon}</View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.count}>{count}</Text>
        <Text
          style={[
            styles.title,
            {
              color: colors.hint,
            },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 8,
  },
  top: {
    marginBottom: 16,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
    marginLeft: 8,
  },
  title: {
    fontSize: moderateScale(18),
    marginLeft: 8,
  },
  count: {
    fontSize: moderateScale(18),
    fontWeight: 600,
  },
});
