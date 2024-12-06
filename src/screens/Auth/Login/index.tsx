import { AppButton } from 'components';
import { LOCALES } from 'constants/locales';
import { IS_IOS } from 'constants/platform';
import { useAppNavigation } from 'hooks/useAppNavigation';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import { EMainRoutes } from 'navigation/Main/routes';
import { ERootRoutes } from 'navigation/Root/routes';

import { getAuthUri } from './helpers';
import { Container, Title } from './styled';

export const LoginScreen = observer(() => {
  const navigation = useAppNavigation();
  const { authStore, userStore } = useRootStore();

  const handleLogin = async () => {
    const uri = getAuthUri();

    if (IS_IOS) {
      // TODO: implement auth for iOS
      navigation.navigate(ERootRoutes.WebView, { uri });
      return;
    }

    const result = await authStore.auth(uri);
    const user = await userStore.getUser();

    if (result && user) {
      navigation.replace(ERootRoutes.Main, {
        screen: EMainRoutes.Chat,
      });
    }
  };

  return (
    <Container>
      <Title>{LOCALES.AppTitle}</Title>
      <AppButton
        title={LOCALES.Login}
        onPress={handleLogin}
        isLoading={
          authStore.loadingModel.isLoading || userStore.loadingModel.isLoading
        }
      />
    </Container>
  );
});
