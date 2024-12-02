import { useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import RenderHtml from 'react-native-render-html';

import { Container } from './styled';
import { useChatController } from './useChatController';
import { AppButton } from '../../../components/AppButton';
import { ChatMessage } from '../../../modules/Chat/models/chatMessage';
export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const { isLoading, handleLogout, messages, width, formatChatMessage } =
    useChatController();

  const renderMessage = useCallback(({ item }) => {
    const messageHtml = formatChatMessage(item);

    return (
      <RenderHtml
        contentWidth={width}
        source={{
          html: messageHtml,
        }}
      />
    );
  }, []);

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
