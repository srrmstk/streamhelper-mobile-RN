import { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { Author, Container, Message, MessageContainer } from './styled';
import { useChatController } from './useChatController';
import { AppButton } from '../../../components/AppButton';
import { ChatMessage } from '../../../modules/Chat/models/chatMessage';

export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const { isLoading, handleLogout, messages } = useChatController();

  const renderMessage = useCallback(
    ({ item }) => (
      <MessageContainer>
        <Author color={item.color}>{item.author}</Author>
        <Message>{item.message}</Message>
      </MessageContainer>
    ),
    [],
  );

  return (
    <Container>
      <AppButton title={t('logout')} onPress={handleLogout} />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <FlatList<ChatMessage>
          keyExtractor={item => item.id}
          data={messages}
          renderItem={renderMessage}
        />
      )}
    </Container>
  );
});
