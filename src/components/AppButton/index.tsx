import { FC } from 'react';

import { PressableContainer, Text } from './styled';
import { TAppButtonProps } from './types';

export const AppButton: FC<TAppButtonProps> = ({
  title,
  onPress,
  style,
  topIcon,
  textStyles,
  ...props
}) => {
  return (
    <PressableContainer
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...props}
    >
      <>
        {topIcon || null}
        <Text style={textStyles}>{title}</Text>
      </>
    </PressableContainer>
  );
};
