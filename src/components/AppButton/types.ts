import { TextStyle, TouchableOpacityProps } from 'react-native';

import { Icon } from 'react-native-vector-icons/Icon';

export type TAppButtonProps = {
  title?: string;
  textStyles?: TextStyle;
  topIcon?: React.ReactElement<Icon>;
} & Omit<TouchableOpacityProps, 'children'>;
