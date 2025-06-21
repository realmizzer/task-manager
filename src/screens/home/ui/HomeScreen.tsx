import { observer } from 'mobx-react';
import { useStores } from '@/shared/stores/lib/useStores.ts';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { TodoCard } from '@/feature/todo-card';

export const HomeScreen = observer(() => {
  const { counter } = useStores();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TodoCard
          data={{
            title: 'Написать серверную часть',
            description: 'Express.js + MongoDB',
            importance: 'important',
            createdAt: '6/21/2025',
            until: '6/21/2025 17:00:00',
            completed: false,
          }}
        />
        <TodoCard
          data={{
            title: 'Сверстать карточку todo',
            description: '',
            importance: 'important',
            createdAt: '02.01.2025',
            until: '6/21/2025 17:00:00',
            completed: true,
          }}
        />
        <TodoCard
          data={{
            title: 'Добавить фильтры',
            description: 'Для todo сделать фильтры: "Важные", "Обычные" и "Все',
            importance: 'default',
            createdAt: '02.01.2025',
            until: '6/21/2025 17:00:00',
            completed: false,
          }}
        />
        <TodoCard
          data={{
            title: 'CRUD',
            description: 'Редактирование и удаление todo',
            importance: 'default',
            createdAt: '02.01.2025',
            until: '6/21/2025 17:00:00',
            completed: true,
          }}
        />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    gap: 8,
    backgroundColor: '#939393',
  },
});
