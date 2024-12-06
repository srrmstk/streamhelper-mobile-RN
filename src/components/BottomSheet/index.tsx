import { forwardRef, PropsWithChildren } from 'react';
import { useWindowDimensions } from 'react-native';

import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Backdrop } from 'components/BottomSheet/Backdrop';
import { BottomSheetContainer } from 'components/BottomSheet/styled';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BottomSheet = forwardRef<
  BottomSheetModal,
  BottomSheetModalProps & PropsWithChildren
>(({ children, ...props }, ref) => {
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <BottomSheetContainer
      ref={ref}
      keyboardBlurBehavior={'restore'}
      enableOverDrag={false}
      backdropComponent={Backdrop}
      maxDynamicContentSize={(height - top) * 0.8}
      {...props}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetContainer>
  );
});
