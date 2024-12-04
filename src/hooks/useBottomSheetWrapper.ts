import { useRef } from 'react';

import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const useBottomSheetWrapper = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onShowBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const onHideBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return {
    open: onShowBottomSheet,
    close: onHideBottomSheet,
    ref: bottomSheetRef,
  };
};
