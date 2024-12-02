import { useEffect } from 'react';
import { useWindowDimensions } from 'react-native';

import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRootStore } from 'hooks/useRootStore';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { ERootRoutes } from 'navigation/Root/routes';

export const useChatController = () => {
  const { width } = useWindowDimensions();
  const { authStore, userStore, chatStore, emojiStore } = useRootStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    chatStore.initWs();

    const ws = chatStore.ws;

    if (!ws) {
      return;
    }

    // ws.onopen = () => {
    //   load7Tv();
    // };

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      handleMessage(data);
    };
  }, []);

  const handleLogout = async () => {
    const isLoggedOut = await authStore.logout();

    if (isLoggedOut) {
      navigation.replace(ERootRoutes.Auth, {
        screen: EAuthRoutes.Entry,
      });
    }
  };

  // @TODO: add types for twitch messages
  // eslint-disable-next-line
  const handleMessage = (data: any) => {
    const messageType = data?.metadata?.message_type;

    if (messageType === 'session_welcome') {
      const sessionId = data?.payload?.session?.id;

      if (sessionId && userStore.user?.id) {
        chatStore.createSubscription(userStore.user.id, sessionId);
      }

      return;
    }

    if (messageType === 'notification') {
      const payload = data?.payload?.event;
      chatStore.addMessage(
        payload?.chatter_user_name,
        payload?.message?.text,
        payload?.message_id,
        payload?.color,
      );
    }
  };

  const formatChatMessage = (chatMessage: ChatMessage) => {
    let formattedMessage: string = `
      <div style="flex-direction: row">
        <p style="color: ${chatMessage.color}; margin-right: 8px">${chatMessage.author}</p>
        <p style="flex-direction: row; align-items: center">${chatMessage.message}</p>
      </div>
    `;

    const words = chatMessage.message?.split(' ');

    if (!words) {
      return;
    }

    for (let word of words) {
      const formattedWords: string[] = [];

      if (emojiStore.sevenTvUserSet[word] && !formattedWords.includes(word)) {
        formattedMessage = formattedMessage.replace(
          word,
          `<img style="margin-left: 2px; margin-right: 2px" src="${emojiStore.sevenTvUserSet[word]}" alt="${word}"/>`,
        );
        formattedWords.push(word);
      }
    }

    return formattedMessage;
  };

  return {
    isLoading: chatStore.loadingModel.isLoading,
    handleLogout,
    formatChatMessage,
    messages: chatStore.messages,
    width: width - 32,
  };
};
