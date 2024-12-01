import { useEffect } from 'react';

import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRootStore } from 'hooks/useRootStore';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { ERootRoutes } from 'navigation/Root/routes';

export const useChatController = () => {
  const { authStore, userStore, chatStore } = useRootStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    chatStore.initWs();

    const ws = chatStore.ws;

    if (!ws) {
      return;
    }

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

  return {
    isLoading: chatStore.loadingModel.isLoading,
    handleLogout,
    messages: chatStore.messages,
  };
};
