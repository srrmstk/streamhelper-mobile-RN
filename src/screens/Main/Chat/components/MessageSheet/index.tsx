import { FC } from 'react';

import { AppText } from 'components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Action,
  Actions,
  Avatar,
  AvatarSkeleton,
  MessageContainer,
  MessageContainerSkeleton,
  UserData,
  UserName,
  UserNameSkeleton,
  Wrapper,
} from 'screens/Main/Chat/components/MessageSheet/styled';
import { BottomSheetContainer } from 'screens/Main/Chat/styled';
import { TSelectedMessage } from 'screens/Main/Chat/types';
import { EColors } from 'theme/colors';
export type TProps = {
  selectedMessage?: TSelectedMessage;
};

export const MessageSheet: FC<TProps> = ({ selectedMessage }) => {
  return (
    <BottomSheetContainer>
      <Wrapper>
        <UserData>
          <AvatarSkeleton isLoading={!selectedMessage}>
            <Avatar
              source={{
                uri: selectedMessage?.userData.profileImageUrl ?? '',
              }}
            />
          </AvatarSkeleton>
          <UserNameSkeleton isLoading={!selectedMessage}>
            <UserName>{selectedMessage?.userData.name}</UserName>
          </UserNameSkeleton>
        </UserData>
        <MessageContainerSkeleton isLoading={!selectedMessage}>
          <MessageContainer>
            <AppText>{selectedMessage?.messageData.message}</AppText>
          </MessageContainer>
        </MessageContainerSkeleton>
        {selectedMessage ? (
          <Actions>
            <Action
              title={'Delete'}
              topIcon={<Icon name={'delete'} size={32} />}
            />
            <Action
              title={'Timeout'}
              topIcon={<Icon name={'timer-outline'} size={32} />}
            />
            <Action
              isAccent={true}
              title={'Ban'}
              topIcon={
                <Icon name={'cancel'} size={32} color={EColors.Danger} />
              }
            />
          </Actions>
        ) : null}
      </Wrapper>
    </BottomSheetContainer>
  );
};
