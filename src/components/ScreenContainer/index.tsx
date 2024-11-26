import { PropsWithChildren } from 'react';
import { ViewProps } from 'react-native';

import { Container } from './styled';

type TScreenContainerProps = PropsWithChildren & ViewProps;

export const ScreenContainer: React.FC<TScreenContainerProps> = ({
  children,
  style,
}) => {
  return <Container style={style}>{children}</Container>;
};
