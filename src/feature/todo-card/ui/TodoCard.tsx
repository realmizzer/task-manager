import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TodoStatus } from './TodoStatus';
import { CheckMark } from '@/shared/ui/CheckMark';
import { TodoDTO } from '@/shared/http/todo/getTodos';
import { Date } from '@/entity/date';
import { useTheme } from '@/shared/theme/useTheme';

type TodoCardProps = {
  data: Partial<TodoDTO>;
  onPress?(): void;
  onLongPress?(): void;
};

export const TodoCard = (props: TodoCardProps) => {
  const { data, onPress, onLongPress } = props;

  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
            },
          ]}
        >
          {data.title ?? 'Задача'}
        </Text>
        {data.description && (
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[
              styles.description,
              {
                color: colors.description,
              },
            ]}
          >
            {data.description}
          </Text>
        )}
        <View style={styles.additional}>
          {data.importance && <TodoStatus importance={data.importance} />}
          {data.until && <Date date={data.until} />}
        </View>
      </View>
      <CheckMark checked={data.completed ?? false} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  exclamation: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  content: {
    flexShrink: 1,
    width: '100%',
    marginRight: 16,
  },
  title: {
    fontWeight: 500,
    fontSize: moderateScale(20),
    color: '#222',
  },
  description: {
    fontSize: moderateScale(16),
    color: '#444',
    marginTop: 8,
  },
  additional: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
});
