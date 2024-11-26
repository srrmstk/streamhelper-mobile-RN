import { FC } from 'react';

import { PressableContainer } from './styled';
import { TAppButtonProps } from './types';
import { AppText } from '../AppText';

export const AppButton: FC<TAppButtonProps> = ({
  title,
  onPress,
  style,
  ...props
}) => {
  return (
    <PressableContainer
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      <AppText>{title}</AppText>
    </PressableContainer>
  );
};
