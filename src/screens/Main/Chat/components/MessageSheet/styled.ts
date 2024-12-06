import { AppButton, AppText } from 'components';
import FastImage from 'react-native-fast-image';
import Skeleton from 'react-native-reanimated-skeleton';
import styled from 'styled-components/native';
import { EColors } from 'theme/colors';
import { TYPOGRAPHY } from 'theme/typography';

export const Wrapper = styled.View``;

export const UserData = styled.View`
  flex-direction: row;
`;

export const UserNameSkeleton = styled(Skeleton).attrs({
  layout: [
    {
      height: 26,
      width: 128,
    },
  ],
  containerStyle: {},
  animationDirection: 'diagonalTopRight',
})``;

export const UserName = styled(AppText)`
  ${TYPOGRAPHY.Title2}
`;

export const AvatarSkeleton = styled(Skeleton).attrs({
  layout: [
    {
      height: 64,
      width: 64,
      borderRadius: 32,
      marginRight: 16,
    },
  ],
  containerStyle: {
    alignSelf: 'flex-start',
  },
  animationDirection: 'diagonalTopRight',
})``;

export const Avatar = styled(FastImage)`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  margin-right: 16px;
`;

export const Actions = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const Action = styled(AppButton).attrs<{ isAccent?: boolean }>(
  ({ isAccent }) => ({
    textStyles: {
      color: isAccent ? EColors.Danger : EColors.Black,
    },
  }),
)`
  flex: 1;
  background-color: ${EColors.Gray};
`;

export const MessageContainerSkeleton = styled(Skeleton).attrs({
  layout: [
    {
      height: 24,
      marginTop: 16,
      marginBottom: 16,
      width: '100%',
    },
  ],
  containerStyle: {},
  animationDirection: 'diagonalTopRight',
})``;

export const MessageContainer = styled.View`
  padding: 16px 0;
`;
