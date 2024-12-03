import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import { EAuthRoutes } from 'navigation/Auth/routes';
import { EMainRoutes } from 'navigation/Main/routes';
import { ERootRoutes } from 'navigation/Root/routes';
import BootSplash from 'react-native-bootsplash';

import { Container } from './styles';

export const EntryScreen = observer(() => {
  const { authStore, userStore, emojiStore } = useRootStore();
  const navigation = useAppNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const isTokenExists = await authStore.checkAuth();

      if (!isTokenExists) {
        navigation.replace(EAuthRoutes.Login);
        return;
      }

      const isTokenValid = await authStore.validateToken();

      if (!isTokenValid) {
        navigation.replace(EAuthRoutes.Login);
        return;
      }

      const isUserReceived = await userStore.getUser();

      if (isUserReceived) {
        emojiStore.getSevenTvUserEmojiSet(userStore.user?.id ?? '');
        emojiStore.getTwitchSet(userStore.user?.id ?? '');
        navigation.replace(ERootRoutes.Main, {
          screen: EMainRoutes.Chat,
        });
      }
    };

    checkAuth().finally(async () => {
      await BootSplash.hide({ fade: true });
    });
  }, []);

  return (
    <Container>
      <ActivityIndicator size={'large'} />
    </Container>
  );
});
