import { useCallback } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem } from 'react-native';

import { AppButton, AppText } from 'components';
import { BottomSheet } from 'components/BottomSheet';
import { observer } from 'mobx-react';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { useTranslation } from 'react-i18next';
import { MessageSheet } from 'screens/Main/Chat/components/MessageSheet';

import { Author, Container, MessageContainer, Separator } from './styled';
import { useChatController } from './useChatController';

export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const {
    isLoading,
    handleLogout,
    messages,
    formatChatMessage,
    isChatReady,
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
    return !isChatReady ? (
      <AppText>{t('cannotConnect')}</AppText>
    ) : (
      <FlatList<ChatMessage>
        keyExtractor={item => `${item.id}`}
        data={messages}
        renderItem={renderMessage}
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
