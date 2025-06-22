import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LabelInput } from '@/shared/ui/LabelInput';
import { Button } from '@/shared/ui/Button';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { useTheme } from '@/shared/theme/useTheme';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon';
import { TaskDTO } from '@/shared/api/tasks/types';
import { TASK_DEFAULT } from '@/shared/api/tasks/mocks.ts';
import { observer } from 'mobx-react';
import { useStores } from '@/entity/stores';

type TaskFormProps = {
  data?: TaskDTO;
  onCreate?(): void;
  onCancel?(): void;
};

export const TaskForm = observer((props: TaskFormProps) => {
  const {data, onCancel} = props;

  const [task, setTask] = useState<TaskDTO>(data ?? TASK_DEFAULT);

  const {colors} = useTheme();
  const {tasks} = useStores();

  const onChangeTitle = (text: string) => {
    setTask(prev => ({...prev, title: text}));
  };

  const onChangeDescription = (text: string) => {
    setTask(prev => ({...prev, description: text}));
  };

  const onPressImportance = () => {
    setTask(prev => ({
      ...prev,
      isImportant: !prev.isImportant,
    }));
  };

  const onCreate = async () => {
    await tasks.addTask(task);
    props.onCreate?.();
  }

  useEffect(() => {
    setTask(data ?? TASK_DEFAULT);
  }, [data]);

  return (
    <View style={styles.container}>
      <LabelInput
        label={'Title'}
        value={task?.title}
        onChangeText={onChangeTitle}
      />
      <LabelInput
        multiline
        label={'Description'}
        value={task?.description}
        onChangeText={onChangeDescription}
      />
      <Button
        text={'Important'}
        containerStyle={{
          backgroundColor: task.isImportant ? colors.primary : 'transparent',
          borderColor: colors.primary,
          borderWidth: 2,
        }}
        textStyle={{
          color: task.isImportant ? colors.white : colors.primary,
        }}
        onPress={onPressImportance}
      >
        <View style={{width: 30, height: 30}}>
          <ExclamationMarkIcon
            color={task.isImportant ? colors.white : colors.primary}
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
          <View style={{width: 30, height: 30}}>
            <PlusIcon color={colors.white}/>
          </View>
        </Button>

        <Button
          text={'Create'}
          containerStyle={{
            backgroundColor: colors.success,
          }}
          onPress={onCreate}
        >
          <View style={{width: 30, height: 30}}>
            <PlusIcon color={colors.white}/>
          </View>
        </Button>
      </View>
    </View>
  );
});

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
