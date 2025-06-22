import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { TaskForm } from 'src/widgets/TaskForm';
import { isIOS } from '@/shared/helpers/isIOS';
import { useTheme } from '@/shared/theme/useTheme';
import { TaskDTO } from '@/shared/api/tasks/types';

type AddTodoBottomSheetProps = {
  data?: TaskDTO;
  onClose?(): void;
};

type AddTodoBottomSheetRef = {} & Partial<BottomSheet>;

export const AddTodoBottomSheet = forwardRef<
  AddTodoBottomSheetRef,
  AddTodoBottomSheetProps
>((props, ref) => {
  const { data, onClose } = props;

  const { colors } = useTheme();

  const bottomSheet = useRef<BottomSheet>(null);

  const onCreate = () => {
    bottomSheet.current?.close();
  };

  const onChange = (i: number) => {
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
      onChange={onChange}
    >
      <BottomSheetView
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <TaskForm data={data} onCreate={onCreate} />
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
