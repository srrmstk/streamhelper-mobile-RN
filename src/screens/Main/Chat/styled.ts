import { AppText, ScreenContainer } from 'components';
import AnimatedWebP from 'react-native-animated-webp';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import { EColors } from 'theme/colors';
import { TYPOGRAPHY } from 'theme/typography';

export const Container = styled(ScreenContainer)`
  margin: 0 -16px;
`;

export const MessageContainer = styled.TouchableOpacity<{ isDeleted: boolean }>`
  flex: 1;
  padding: 8px 16px;
  opacity: ${({ isDeleted }) => (isDeleted ? 0.4 : 1)};
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

export const SevenTvEmoji = styled(AnimatedWebP)<{
  height: number;
  width: number;
}>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-left: 2px;
  margin-right: 2px;
`;

export const TwitchEmoji = styled(FastImage)<{ height: number; width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  margin-left: 2px;
  margin-right: 2px;
`;

export const BottomSheetContainer = styled.View`
  padding: 16px;
`;

export const NotConnectedContainer = styled.View`
  background-color: ${EColors.Danger};
  margin-top: 8px;
  padding: 4px;
  align-items: center;
`;

export const NotConnected = styled(AppText)`
  ${TYPOGRAPHY.Callout}
  color: ${EColors.White}
`;
