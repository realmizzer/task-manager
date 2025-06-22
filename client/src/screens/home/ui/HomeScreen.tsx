import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { AddTodoBottomSheet } from './AddTodoBottomSheet';
import { TodoActionsBottomSheet } from './TodoActionsBottomSheet';
import { TodoFilter } from './TodoFilter';
import { TaskCard } from '@/feature/task-card';
import { TaskDTO, TasksFiltersDTO } from '@/shared/api/tasks/types.ts';
import { useTheme } from '@/shared/theme/useTheme';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { isIOS } from '@/shared/helpers/isIOS';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon';
import { TodoIcon } from '@/shared/ui/icons/TodoIcon';
import { useStores } from '@/entity/stores/lib/useStores.ts';
import { moderateScale } from 'react-native-size-matters';

export const HomeScreen = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState<TaskDTO>();
  const [activeFilter, setActiveFilter] = useState<TasksFiltersDTO | undefined>(
    undefined,
  );

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
  const onPressImportantFilter = async () => {
    setActiveFilter(prev => {
      if (prev === 'important') return undefined;
      return 'important';
    });
  };

  const onPressUncompletedFilter = () => {
    setActiveFilter(prev => {
      if (prev === 'uncompleted') return undefined;
      return 'uncompleted';
    });
  };

  useEffect(() => {
    (async () => {
      try {
        await tasks.getAllTasks();
        await tasks.getTasksInfo();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const options = activeFilter
          ? {
              filters: [activeFilter],
            }
          : undefined;

        await tasks.getAllTasks(options);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [activeFilter]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text
            style={[
              styles.appName,
              {
                color: colors.text,
              },
            ]}
          >
            Task Manager
          </Text>
          <Text
            style={[
              styles.author,
              {
                color: colors.hint,
              },
            ]}
          >
            (by Maxim Nikolaev «realmizzer»)
          </Text>
        </View>
        <View style={styles.filters}>
          <TodoFilter
            title={'Important'}
            icon={
              <ExclamationMarkIcon
                color={
                  activeFilter === 'important'
                    ? colors.white
                    : colors.description
                }
              />
            }
            isActive={activeFilter === 'important'}
            count={tasks.info.importantTasksCount}
            onPress={onPressImportantFilter}
          />
          <TodoFilter
            title={'Uncompleted'}
            icon={
              <TodoIcon
                color={
                  activeFilter === 'uncompleted'
                    ? colors.white
                    : colors.description
                }
              />
            }
            isActive={activeFilter === 'uncompleted'}
            count={tasks.info.uncompletedTasksCount}
            onPress={onPressUncompletedFilter}
          />
        </View>
        <FlashList
          estimatedItemSize={127}
          data={tasks.data}
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
  title: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  appName: {
    fontWeight: 600,
    fontSize: moderateScale(24),
  },
  author: {
    marginLeft: 8,
    fontSize: moderateScale(10),
    marginBottom: 4,
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
