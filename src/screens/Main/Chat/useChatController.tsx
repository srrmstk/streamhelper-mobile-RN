import { useEffect, useState } from 'react';

import { AppText } from 'components';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useBottomSheetWrapper } from 'hooks/useBottomSheetWrapper';
import { useRootStore } from 'hooks/useRootStore';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { ToastService } from 'modules/Toast/toastService';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { ERootRoutes } from 'navigation/Root/routes';
import { useTranslation } from 'react-i18next';

import { Message, SevenTvEmoji, TwitchEmoji } from './styled';
import { TSelectedMessage } from './types';

export const useChatController = () => {
  const { authStore, userStore, chatStore, emojiStore } = useRootStore();
  const navigation = useAppNavigation();
  const { ref, open } = useBottomSheetWrapper();
  const { t } = useTranslation();

  const [selectedMessage, setSelectedMessage] = useState<
    TSelectedMessage | undefined
  >();

  useEffect(() => {
    handleWsConnect();

    const ws = chatStore.ws;

    if (!ws) {
      return;
    }

    ws.onmessage = e => {
      const data = JSON.parse(e.data);
      handleMessage(data);
    };

    ws.onerror = () => {
      new ToastService().showErrorToast({
        description: t('chatConnectionError'),
      });
    };

    ws.onclose = () => {
      chatStore.deinitWs();
    };

    return ws.close();
  }, []);

  const handleWsConnect = () => {
    if (!chatStore.isInitialized) {
      chatStore.initWs();
    }
  };

  const handleLogout = async () => {
    const isLoggedOut = await authStore.logout();
    chatStore.setMessages([]);

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
        payload?.chatter_user_id,
        payload?.chatter_user_name,
        payload?.message?.text,
        payload?.message_id,
        payload?.color,
      );
    }
  };

  // @TODO: somehow deal with keys
  const formatChatMessage = (chatMessage: ChatMessage) => {
    const pushTextComponent = () => {
      components.push(
        <AppText key={`text_${new Date().getUTCMilliseconds()}`}>
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
      const sevenTvEmoji = emojiStore.sevenTvUserSet[word];
      const twitchEmoji = emojiStore.twitchSet[word];

      if (sevenTvEmoji || twitchEmoji) {
        if (messageString.trim().length) {
          pushTextComponent();
        }

        if (sevenTvEmoji) {
          components.push(
            <SevenTvEmoji
              key={`7tv_${new Date().getUTCMilliseconds()}`}
              height={sevenTvEmoji.height ?? 0}
              width={sevenTvEmoji.width ?? 0}
              animatedSource={{
                uri: sevenTvEmoji.url ?? '',
              }}
              thumbnailSource={{
                uri: sevenTvEmoji.url ?? '',
              }}
              autoplay={true}
              loop={true}
            />,
          );
        }

        if (twitchEmoji) {
          components.push(
            <TwitchEmoji
              key={`twitch_${new Date().getUTCMilliseconds()}`}
              resizeMode={'contain'}
              height={twitchEmoji.height ?? 0}
              width={twitchEmoji.width ?? 0}
              source={{
                uri: twitchEmoji.url || '',
              }}
            />,
          );
        }
      } else {
        messageString += `${word} `;
      }

      if (word === words[words.length - 1] && messageString.trim().length) {
        pushTextComponent();
      }
    }

    return <Message>{components}</Message>;
  };

  const onMessagePress = async (item: ChatMessage) => {
    if (!item.authorId) {
      return;
    }

    open();
    const user = await chatStore.getChatUser(item.authorId);

    if (!user) {
      onBottomSheetClose();
      return;
    }

    setSelectedMessage({
      userData: user,
      messageData: item,
    });
  };

  const onBottomSheetClose = () => {
    setSelectedMessage(undefined);
  };

  return {
    isLoading: chatStore.loadingModel.isLoading,
    handleLogout,
    handleWsConnect,
    formatChatMessage,
    messages: chatStore.messages,
    selectedMessage,
    ref,
    onMessagePress,
    onBottomSheetClose,
  };
};
