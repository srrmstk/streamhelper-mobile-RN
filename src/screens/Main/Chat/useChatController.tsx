import { useEffect, useState } from 'react';

import { AppText } from 'components';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useBottomSheetWrapper } from 'hooks/useBottomSheetWrapper';
import { useRootStore } from 'hooks/useRootStore';
import { ChatMessage } from 'modules/Chat/models/chatMessage';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { ERootRoutes } from 'navigation/Root/routes';

import { Message, SevenTvEmoji, TwitchEmoji } from './styled';
import { TSelectedMessage } from './types';

export const useChatController = () => {
  const { authStore, chatStore, userStore, emojiStore } = useRootStore();
  const navigation = useAppNavigation();
  const { ref, open } = useBottomSheetWrapper();

  const [selectedMessage, setSelectedMessage] = useState<
    TSelectedMessage | undefined
  >();

  useEffect(() => {
    chatStore.connect();
  }, []);

  const handleLogout = async () => {
    const isLoggedOut = await authStore.logout();
    chatStore.clearMessages();

    if (isLoggedOut) {
      navigation.replace(ERootRoutes.Auth, {
        screen: EAuthRoutes.Entry,
      });
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
    const user = await userStore.getUserById(item.authorId);

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
    formatChatMessage,
    messages: chatStore.messages,
    selectedMessage,
    ref,
    onMessagePress,
    onBottomSheetClose,
    reconnect: chatStore.connect,
    isConnected: chatStore.ws.isConnected,
  };
};
