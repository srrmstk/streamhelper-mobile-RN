import { observer } from 'mobx-react';
import { ActivityIndicator } from 'react-native';
import { useRootStore } from '../../../hooks/useRootStore';
import { useEffect } from 'react';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { EAuthRoutes } from '../../../navigation/Auth/routes';
import { EMainRoutes } from '../../../navigation/Main/routes';
import { Container } from './styles';
import { ERootRoutes } from '../../../navigation/Root/routes';

export const EntryScreen = observer(() => {
  const { authStore } = useRootStore();
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

      navigation.replace(ERootRoutes.Main, {
        screen: EMainRoutes.Chat,
      });
    };

    checkAuth();
  }, []);

  return (
    <Container>
      <ActivityIndicator size={'large'} />
    </Container>
  );
});
