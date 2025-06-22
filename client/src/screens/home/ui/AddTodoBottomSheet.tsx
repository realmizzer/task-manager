import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { TaskForm } from 'src/widgets/TaskForm';
import { isIOS } from '@/shared/helpers/isIOS';
import { useTheme } from '@/shared/theme/useTheme';
import { TaskDTO } from '@/shared/api/tasks/types';

type AddTodoBottomSheetProps = {
  data?: TaskDTO;
  isEditing?: boolean;
  onClose?(): void;
};

type AddTodoBottomSheetRef = {} & Partial<BottomSheet>;

export const AddTodoBottomSheet = forwardRef<
  AddTodoBottomSheetRef,
  AddTodoBottomSheetProps
>((props, ref) => {
  const { data, isEditing, onClose } = props;

  const { colors } = useTheme();

  const bottomSheet = useRef<BottomSheet>(null);

  const onTaskCreate = () => {
    bottomSheet.current?.close();
  };

  const onTaskEdit = () => {
    bottomSheet.current?.close();
  };

  const onBottomSheetChange = (i: number) => {
    if (i === -1) onClose?.();
  };

  useImperativeHandle(ref, () => ({
    ...bottomSheet.current,
  }));

  return (
    <BottomSheet
      enablePanDownToClose
      index={-1}
      ref={bottomSheet}
      backgroundStyle={{
        backgroundColor: colors.card,
      }}
      onChange={onBottomSheetChange}
    >
      <BottomSheetView
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <TaskForm
          data={data}
          isEditing={isEditing}
          onCreate={onTaskCreate}
          onEdit={onTaskEdit}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    padding: 16,
    paddingBottom: isIOS() ? 64 : 16,
  },
});
