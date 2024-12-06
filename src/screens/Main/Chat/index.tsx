import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';

import { AppButton } from 'components';
import { BottomSheet } from 'components/BottomSheet';
import { observer } from 'mobx-react';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { useTranslation } from 'react-i18next';

import { MessageSheet } from './components/MessageSheet';
import { Author, Container, MessageContainer, Separator } from './styled';
import { useChatController } from './useChatController';

export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const {
    isLoading,
    handleLogout,
    handleWsConnect,
    messages,
    formatChatMessage,
    selectedMessage,
    onMessagePress,
    ref,
    onBottomSheetClose,
  } = useChatController();

  const renderMessage: ListRenderItem<ChatMessage> = useCallback(
    ({ item }) => {
      const MessageContent = () => formatChatMessage(item);

      return (
        <MessageContainer onPress={() => onMessagePress(item)}>
          <Author color={item.color}>{item.author}</Author>
          <MessageContent />
        </MessageContainer>
      );
    },
    [messages],
  );

  const renderContent = () => {
    return (
      <FlatList<ChatMessage>
        keyExtractor={item => `${item.id}`}
        data={messages}
        renderItem={renderMessage}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleWsConnect} />
        }
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  };

  return (
    <Container>
      <AppButton title={t('logout')} onPress={handleLogout} />
      {isLoading ? <ActivityIndicator size={'large'} /> : renderContent()}
      <BottomSheet ref={ref} onDismiss={onBottomSheetClose}>
        <MessageSheet selectedMessage={selectedMessage} />
      </BottomSheet>
    </Container>
  );
});
