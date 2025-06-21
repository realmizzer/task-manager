import { StyleSheet, Text, View } from 'react-native';
import { getTodoImportanceName } from '../lib/getTodoImportanceName.ts';
import { TodoImportance } from '@/shared/http/todo/getTodos.ts';
import { ExclamationMarkIcon } from '@/shared/ui/icons/ExclamationMarkIcon.tsx';

type TodoStatusProps = {
  importance: TodoImportance;
};

const importantColor = '#8c6af1';

export const TodoStatus = (props: TodoStatusProps) => {
  const { importance } = props;

  if (importance === 'default') return null;

  return (
    <View style={styles.container}>
      <View style={{ width: 16, height: 16 }}>
        <ExclamationMarkIcon color={importantColor} />
      </View>
      <Text style={styles.text}>
        {getTodoImportanceName(importance).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#dce4fa',
    borderRadius: 4,
  },
  text: {
    color: importantColor,
  },
});
