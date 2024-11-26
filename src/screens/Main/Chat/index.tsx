import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { Container } from './styled';
import { AppButton } from '../../../components/AppButton';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { useRootStore } from '../../../hooks/useRootStore';
import { EAuthRoutes } from '../../../navigation/Auth/routes';
import { ERootRoutes } from '../../../navigation/Root/routes';

export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const { authStore } = useRootStore();
  const navigation = useAppNavigation();

  const handleLogout = async () => {
    const isLoggedOut = await authStore.logout();

    if (isLoggedOut) {
      navigation.replace(ERootRoutes.Auth, {
        screen: EAuthRoutes.Entry,
      });
    }
  };

  return (
    <Container>
      <AppButton title={t('logout')} onPress={handleLogout} />
    </Container>
  );
});
