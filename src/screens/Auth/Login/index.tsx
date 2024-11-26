import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { getAuthUri } from './helpers';
import { Container, Title } from './styled';
import { AppButton } from '../../../components/AppButton';
import { IS_IOS } from '../../../constants/platform';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { useRootStore } from '../../../hooks/useRootStore';
import { EMainRoutes } from '../../../navigation/Main/routes';
import { ERootRoutes } from '../../../navigation/Root/routes';

export const LoginScreen = observer(() => {
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const { authStore } = useRootStore();

  const handleLogin = async () => {
    const uri = getAuthUri();

    if (IS_IOS) {
      // TODO: implement auth for iOS
      navigation.navigate(ERootRoutes.WebView, { uri });
      return;
    }

    const result = await authStore.auth(uri);

    if (result) {
      navigation.replace(ERootRoutes.Main, {
        screen: EMainRoutes.Chat,
      });
    }
  };

  return (
    <Container>
      <Title>{t('app_title')}</Title>
      <AppButton title={t('login')} onPress={handleLogin} />
    </Container>
  );
});
