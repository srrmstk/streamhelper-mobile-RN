import styled from 'styled-components/native';

import { AppText } from '../../../components/AppText';
import { ScreenContainer } from '../../../components/ScreenContainer';

export const Container = styled(ScreenContainer)``;

export const MessageContainer = styled.View`
  flex-direction: row;
`;
export const Author = styled(AppText)<{ color: string }>`
  margin-right: 8px;
  color: ${({ color }) => color};
`;
export const Message = styled(AppText)``;
