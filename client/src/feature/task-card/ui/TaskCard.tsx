import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { TaskImportant } from './TaskImportant.tsx';
import { DateTime } from 'src/entity/DateTime';
import { CheckMark } from '@/shared/ui/CheckMark';
import { useTheme } from '@/shared/theme/useTheme';
import { TaskDTO } from '@/shared/api/tasks/types';

type PartialTodoDTO = Partial<TaskDTO>;

type TodoCardProps = {
  data: PartialTodoDTO;
  onPress?(todo: PartialTodoDTO): void;
  onLongPress?(todo: PartialTodoDTO): void;
  onCheckMarkPress?(todo: PartialTodoDTO): void;
};

export const TaskCard = (props: TodoCardProps) => {
  const { data } = props;

  const { colors } = useTheme();

  const onPress = () => {
    props.onPress?.(data);
  };

  const onLongPress = () => {
    props.onLongPress?.(data);
  };

  const onCheckMarkPress = () => {
    props.onCheckMarkPress?.(data);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
        },
      ]}
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
          {data.isImportant && <TaskImportant />}
          {data.until && <DateTime date={data.until} />}
        </View>
      </View>
      <CheckMark
        checked={data.isCompleted ?? false}
        onPress={onCheckMarkPress}
      />
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
