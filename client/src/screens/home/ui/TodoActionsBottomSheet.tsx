import { forwardRef, useImperativeHandle, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { isIOS } from '@/shared/helpers/isIOS';
import { useTheme } from '@/shared/theme/useTheme';
import { moderateScale } from 'react-native-size-matters';
import { Button } from '@/shared/ui/Button.tsx';

type TaskActionsBottomSheetProps = {
  onEdit?(): void;
  onDelete?(): void;
};

type TaskActionsBottomSheetRef = {} & Partial<BottomSheet>;

export const TodoActionsBottomSheet = forwardRef<
  TaskActionsBottomSheetRef,
  TaskActionsBottomSheetProps
>((props, ref) => {
  const { colors } = useTheme();

  const bottomSheet = useRef<BottomSheet>(null);

  useImperativeHandle(ref, () => ({
    ...bottomSheet.current,
  }));

  const onEdit = () => {
    bottomSheet.current?.close();
    props.onEdit?.();
  };

  const onDelete = () => {
    bottomSheet.current?.close();
    props.onDelete?.();
  };

  return (
    <BottomSheet
      enablePanDownToClose
      index={-1}
      ref={bottomSheet}
      backgroundStyle={{
        backgroundColor: colors.card,
      }}
    >
      <BottomSheetView
        style={[
          styles.bottomSheet,
          {
            backgroundColor: colors.card,
          },
        ]}
      >
        <Button
          text={'Edit'}
          onPress={onEdit}
          containerStyle={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
          }}
        />
        <Button
          text={'Delete'}
          onPress={onDelete}
          containerStyle={{
            backgroundColor: colors.fail,
            paddingVertical: 12,
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    flex: 1,
    padding: 16,
    paddingBottom: isIOS() ? 64 : 16,
    gap: 16,
  },
  button: {
    width: '100%',
  },
  text: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
