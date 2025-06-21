import { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';
import { AddTodoBottomSheet } from './AddTodoBottomSheet';
import { TodoActionsBottomSheet } from './TodoActionsBottomSheet';
import { TodoFilter } from './TodoFilter';
import { TodoCard } from '@/feature/todo-card';
import { useTheme } from '@/shared/theme/useTheme';
import { TodoDTO } from '@/shared/http/todo/getTodos';
import { PlusIcon } from '@/shared/ui/icons/PlusIcon';
import { isIOS } from '@/shared/helpers/isIOS';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon.tsx';
import { TodoIcon } from '@/shared/ui/icons/TodoIcon.tsx';

const mock: TodoDTO[] = [
  {
    title: 'Написать серверную часть',
    description: 'Express.js + MongoDB',
    importance: 'important',
    createdAt: '6/21/2025',
    until: '6/21/2025 17:00:00',
    completed: false,
  },
  {
    title: 'Сверстать карточку todo',
    description: '',
    importance: 'important',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    completed: true,
  },
  {
    title: 'Добавить фильтры',
    description: 'Для todo сделать фильтры: "Важные", "Обычные" и "Все',
    importance: 'default',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    completed: false,
  },
  {
    title: 'CRUD',
    description: 'Редактирование и удаление todo',
    importance: 'default',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    completed: true,
  },
];

export const HomeScreen = observer(() => {
  const { colors } = useTheme();

  const [selectedTodo, setSelectedTodo] = useState<TodoDTO>();

  const addTodoRef = useRef<BottomSheet>(null);
  const todoActionsRef = useRef<BottomSheet>(null);

  // === Create a task button ===
  const onPressAddTodo = () => {
    addTodoRef.current?.expand();
  };

  // === Card Actions ===
  const onLongPress = (todo: TodoDTO) => {
    setSelectedTodo(todo);
    todoActionsRef.current?.expand();
  };

  // === Card Actions Bottom sheet ===
  const onEditTodo = () => {
    addTodoRef.current?.expand();
  };

  const onDeleteTodo = () => {
    console.log('delete');
  };

  // === Add Task Bottom sheet ===
  const onCloseAddTodo = () => {
    setSelectedTodo(undefined);
  };

  // === Filters ===
  const onPressImportantFilter = () => {};

  const onPressDefaultFilter = () => {};

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
          data={mock}
          renderItem={({ item }) => (
            <TodoCard onLongPress={onLongPress} data={item} />
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
