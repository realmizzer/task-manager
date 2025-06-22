import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LabelInput } from '@/shared/ui/LabelInput';
import { Button } from '@/shared/ui/Button';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { useTheme } from '@/shared/theme/useTheme';
import { TODO_DEFAULT, TodoDTO } from '@/shared/http/todo/getTodos';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon';

type TodoFormProps = {
  data?: TodoDTO;
  onCreate?(): void;
  onCancel?(): void;
};

export const TodoForm = (props: TodoFormProps) => {
  const { data, onCreate, onCancel } = props;

  const { colors } = useTheme();

  const [todo, setTodo] = useState<TodoDTO>(data ?? TODO_DEFAULT);

  const isImportant = todo.importance === 'important';

  const onChangeTitle = (text: string) => {
    setTodo(prev => ({ ...prev, title: text }));
  };

  const onChangeDescription = (text: string) => {
    setTodo(prev => ({ ...prev, description: text }));
  };

  const onPressImportance = () => {
    setTodo(prev => ({
      ...prev,
      importance: prev.importance === 'important' ? 'default' : 'important',
    }));
  };

  useEffect(() => {
    setTodo(data ?? TODO_DEFAULT);
  }, [data]);

  return (
    <View style={styles.container}>
      <LabelInput
        label={'Title'}
        value={todo?.title}
        onChangeText={onChangeTitle}
      />
      <LabelInput
        multiline
        label={'Description'}
        value={todo?.description}
        onChangeText={onChangeDescription}
      />
      <Button
        text={'Important'}
        containerStyle={{
          backgroundColor: isImportant ? colors.primary : 'transparent',
          borderColor: colors.primary,
          borderWidth: 2,
        }}
        textStyle={{
          color: isImportant ? colors.white : colors.primary,
        }}
        onPress={onPressImportance}
      >
        <View style={{ width: 30, height: 30 }}>
          <ExclamationMarkIcon
            color={isImportant ? colors.white : colors.primary}
          />
        </View>
      </Button>
      <View style={styles.actions}>
        <Button
          text={'Cancel'}
          containerStyle={{
            backgroundColor: colors.fail,
          }}
          onPress={onCancel}
        >
          <View style={{ width: 30, height: 30 }}>
            <PlusIcon color={colors.white} />
          </View>
        </Button>

        <Button
          text={'Create'}
          containerStyle={{
            backgroundColor: colors.success,
          }}
          onPress={onCreate}
        >
          <View style={{ width: 30, height: 30 }}>
            <PlusIcon color={colors.white} />
          </View>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  actions: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 32,
  },
});
