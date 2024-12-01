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
      console.log(data);

      const sessionId = data?.payload?.session?.id;

      if (sessionId && userStore.user?.id) {
        chatStore.createSubscription(userStore.user.id, sessionId);
      }
    };

    ws.onerror = e => {
      console.log('WS ERROR: ', e.message);
    };

    ws.onclose = e => {
      console.log('WS CLOSED ', e.code, e.reason);
    };
  }, [chatStore.ws]);

  const handleLogout = async () => {
    const isLoggedOut = await authStore.logout();

    if (isLoggedOut) {
      navigation.replace(ERootRoutes.Auth, {
        screen: EAuthRoutes.Entry,
      });
    }
  };

  return {
    isLoading: chatStore.loadingModel.isLoading,
    handleLogout,
  };
};
