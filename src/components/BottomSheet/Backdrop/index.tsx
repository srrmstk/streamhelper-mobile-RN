import { FC } from 'react';
import { Keyboard } from 'react-native';

import { BottomSheetBackdropProps, useBottomSheet } from '@gorhom/bottom-sheet';
import { BackdropContainer } from 'components/BottomSheet/Backdrop/styled';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { EColors } from 'theme/colors';

export const Backdrop: FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style,
}) => {
  const { close } = useBottomSheet();

  const onBackPress = () => {
    Keyboard.dismiss();
    close();
  };

  const containerAnimatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: EColors.Black,
      opacity: interpolate(
        animatedIndex.value,
        [0, 1],
        [0.4, 1],
        Extrapolation.CLAMP,
      ),
    }),
    [],
  );

  return (
    <Animated.View style={[style, containerAnimatedStyle]}>
      <BackdropContainer onPress={onBackPress} />
    </Animated.View>
  );
};
