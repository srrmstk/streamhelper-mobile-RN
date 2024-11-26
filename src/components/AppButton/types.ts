import { PressableProps } from 'react-native';

export type TAppButtonProps = {
  title?: string;
} & Omit<PressableProps, 'children'>;
