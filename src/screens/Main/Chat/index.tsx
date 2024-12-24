import { useCallback } from 'react';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { AppButton } from 'components';
import { BottomSheet } from 'components/BottomSheet';
import { LOCALES } from 'constants/locales';
import { observer } from 'mobx-react';
import { ChatMessage } from 'modules/Chat/models/chatMessage';

import { MessageSheet } from './components/MessageSheet';
import {
  Author,
  Container,
  MessageContainer,
  NotConnected,
  NotConnectedContainer,
  Separator,
} from './styled';
import { useChatController } from './useChatController';

export const ChatScreen = observer(() => {
  const {
    isLoading,
    handleLogout,
    messages,
    formatChatMessage,
    selectedMessage,
    onMessagePress,
    ref,
    onBottomSheetClose,
    reconnect,
    isConnected,
  } = useChatController();

  const renderMessage: ListRenderItem<ChatMessage> = useCallback(
    ({ item }) => {
      const MessageContent = () => formatChatMessage(item);

      return (
        <MessageContainer
          onPress={() => onMessagePress(item)}
          isDeleted={item.isDeleted}
        >
          <Author color={item.color}>{item.author}</Author>
          <MessageContent />
        </MessageContainer>
      );
    },
    [messages],
  );

  return (
    <Container>
      <AppButton title={LOCALES.Logout} onPress={handleLogout} />
      {!isConnected && (
        <NotConnectedContainer>
          <NotConnected>{LOCALES.ChatConnectionError}</NotConnected>
        </NotConnectedContainer>
      )}
      <FlatList<ChatMessage>
        keyExtractor={item => `${item.id}`}
        data={messages.slice()}
        renderItem={renderMessage}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={reconnect} />
        }
        ItemSeparatorComponent={() => <Separator />}
      />
      <BottomSheet ref={ref} onDismiss={onBottomSheetClose}>
        <MessageSheet selectedMessage={selectedMessage} />
      </BottomSheet>
    </Container>
  );
});
