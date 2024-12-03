import { TouchableOpacityProps } from 'react-native';

export type TAppButtonProps = {
  title?: string;
} & Omit<TouchableOpacityProps, 'children'>;
