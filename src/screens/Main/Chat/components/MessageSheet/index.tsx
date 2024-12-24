import { FC } from 'react';

import { AppText } from 'components';
import { LOCALES } from 'constants/locales';
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

import { useMessageSheetController } from './useMessageSheetController';

export type TProps = {
  selectedMessage?: TSelectedMessage;
};

export const MessageSheet: FC<TProps> = ({ selectedMessage }) => {
  const { banUser, unbanUser, deleteMessage } =
    useMessageSheetController(selectedMessage);

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
              title={
                selectedMessage.messageData.isDeleted
                  ? LOCALES.Deleted
                  : LOCALES.Delete
              }
              disabled={selectedMessage.messageData.isDeleted}
              onPress={deleteMessage}
              topIcon={
                <Icon
                  name={
                    selectedMessage.messageData.isDeleted ? 'check' : 'delete'
                  }
                  size={32}
                />
              }
            />
            <Action
              title={LOCALES.Timeout}
              onPress={() => banUser({ duration: 30 })}
              topIcon={<Icon name={'timer-outline'} size={32} />}
            />
            <Action
              title={LOCALES.Ban}
              onPress={() => banUser()}
              isAccent={true}
              topIcon={
                <Icon name={'cancel'} size={32} color={EColors.Danger} />
              }
            />
            <Action
              title={LOCALES.Unban}
              onPress={unbanUser}
              isAccent={true}
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
