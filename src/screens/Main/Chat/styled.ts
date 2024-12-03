import { AppText, ScreenContainer } from 'components';
import AnimatedWebP from 'react-native-animated-webp';
import styled from 'styled-components/native';
import { EColors } from 'theme/colors';

export const Container = styled(ScreenContainer)`
  margin: 0 -16px;
`;

export const MessageContainer = styled.TouchableOpacity`
  flex: 1;
  padding: 8px 16px;
`;

export const Author = styled(AppText)<{ color: string | null }>`
  font-weight: bold;
  margin-bottom: 4px;
  color: ${({ color }) => color};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${EColors.Black};
  opacity: 0.1;
`;

export const Message = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Emoji = styled(AnimatedWebP)<{ height: number; width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-left: 2px;
  margin-right: 2px;
`;
