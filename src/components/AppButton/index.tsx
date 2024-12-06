import { FC } from 'react';
import { ActivityIndicator } from 'react-native';

import { PressableContainer, Text } from './styled';
import { TAppButtonProps } from './types';

export const AppButton: FC<TAppButtonProps> = ({
  title,
  onPress,
  style,
  isLoading,
  disabled,
  topIcon,
  textStyles,
  ...props
}) => {
  return (
    <PressableContainer
      onPress={onPress}
      style={style}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      <>
        {topIcon || null}
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={textStyles}>{title}</Text>
        )}
      </>
    </PressableContainer>
  );
};
