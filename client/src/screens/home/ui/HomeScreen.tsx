import { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { AddTodoBottomSheet } from './AddTodoBottomSheet';
import { TodoActionsBottomSheet } from './TodoActionsBottomSheet';
import { TodoFilter } from './TodoFilter';
import { TaskCard } from '@/feature/task-card';
import { TaskDTO } from '@/shared/api/tasks/types.ts';
import { useTheme } from '@/shared/theme/useTheme';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { isIOS } from '@/shared/helpers/isIOS';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon';
import { TodoIcon } from '@/shared/ui/icons/TodoIcon';
import { useStores } from '@/entity/stores/lib/useStores.ts';

export const HomeScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<TaskDTO>();

  const addTodoRef = useRef<BottomSheet>(null);
  const todoActionsRef = useRef<BottomSheet>(null);

  const { colors } = useTheme();
  const { tasks } = useStores();

  // === Create a task button ===
  const onPressAddTodo = () => {
    addTodoRef.current?.expand();
  };

  // === Card Actions ===
  const onLongPress = (todo: TaskDTO) => {
    setSelectedTodo(todo);
    todoActionsRef.current?.expand();
  };

  const onCheckMarkPress = async (task: TaskDTO) => {
    // todo: a task completion method
    await tasks.updateTask({
      ...task,
      isCompleted: !task.isCompleted,
    });
  };

  // === Card Actions Bottom sheet ===
  const onEditTodo = () => {
    addTodoRef.current?.expand();
  };

  const onDeleteTodo = async () => {
    if (!selectedTodo?._id) {
      console.error('No Task ID on delete');
      return;
    }
    await tasks.deleteTask(selectedTodo._id);
  };

  // === Add Task Bottom sheet ===
  const onCloseAddTodo = () => {
    setSelectedTodo(undefined);
  };

  // === Filters ===
  const onPressImportantFilter = () => {};

  const onPressDefaultFilter = () => {};

  useEffect(() => {
    tasks.getAllTasks().finally(() => setIsLoading(false));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.filters}>
          <TodoFilter
            icon={<ExclamationMarkIcon />}
            title={'Important'}
            count={6}
            onPress={onPressImportantFilter}
          />
          <TodoFilter
            icon={<TodoIcon />}
            title={'Default'}
            count={6}
            onPress={onPressDefaultFilter}
          />
        </View>
        <FlashList
          data={tasks.tasks}
          renderItem={({ item }) => (
            <TaskCard
              data={item}
              onCheckMarkPress={onCheckMarkPress}
              onLongPress={onLongPress}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.addButton,
          {
            backgroundColor: colors.card,
          },
        ]}
        activeOpacity={0.8}
        onPress={onPressAddTodo}
      >
        <PlusIcon color={colors.description} />
      </TouchableOpacity>

      {/* Add task */}
      <AddTodoBottomSheet
        ref={addTodoRef}
        data={selectedTodo}
        isEditing={selectedTodo !== undefined}
        onClose={onCloseAddTodo}
      />

      {/* For example, edit or delete a task */}
      <TodoActionsBottomSheet
        ref={todoActionsRef}
        onEdit={onEditTodo}
        onDelete={onDeleteTodo}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    padding: 8,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    padding: 8,
    bottom: isIOS() ? 48 : 16,
    right: 16,
  },
});
