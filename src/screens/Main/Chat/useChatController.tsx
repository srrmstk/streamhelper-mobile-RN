import { useEffect } from 'react';

import { AppText } from 'components';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRootStore } from 'hooks/useRootStore';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { ERootRoutes } from 'navigation/Root/routes';

import { Emoji, Message } from './styled';

export const useChatController = () => {
  const { authStore, userStore, chatStore, emojiStore } = useRootStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    if (!chatStore.isInitialized) {
      chatStore.initWs();
    }

    const ws = chatStore.ws;

    if (!ws) {
      return;
    }

    ws.onopen = () => {
      chatStore.setIsInitialized(true);
    };

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      handleMessage(data);
    };

    ws.onclose = () => {
      chatStore.setIsInitialized(false);
      chatStore.deinitWs();
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
    const pushTextComponent = () => {
      components.push(
        <AppText key={`text_${new Date().getMilliseconds()}`}>
          {messageString}
        </AppText>,
      );
      messageString = '';
    };

    const components = [];

    const words = chatMessage.message?.split(' ');

    let messageString = '';

    if (!words) {
      return null;
    }

    for (let word of words) {
      const emoji = emojiStore.sevenTvUserSet[word];

      if (emoji) {
        if (messageString.trim().length) {
          pushTextComponent();
        }

        components.push(
          <Emoji
            key={`emoji_${new Date().getMilliseconds()}`}
            height={emoji.height ?? 0}
            width={emoji.width ?? 0}
            animatedSource={{
              uri: emoji.url ?? '',
            }}
            thumbnailSource={{
              uri: emoji.url ?? '',
            }}
            autoplay={true}
            loop={true}
          />,
        );
      } else {
        messageString += `${word} `;
      }

      if (word === words[words.length - 1] && messageString.trim().length) {
        pushTextComponent();
      }
    }

    return <Message>{components}</Message>;
  };

  return {
    isLoading: chatStore.loadingModel.isLoading,
    handleLogout,
    formatChatMessage,
    messages: chatStore.messages,
    isChatReady: chatStore.isInitialized,
  };
};