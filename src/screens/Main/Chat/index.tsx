import { ActivityIndicator } from 'react-native';

import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';

import { Container } from './styled';
import { useChatController } from './useChatController';
import { AppButton } from '../../../components/AppButton';
import { AppText } from '../../../components/AppText';

export const ChatScreen = observer(() => {
  const { t } = useTranslation();
  const { isLoading, handleLogout } = useChatController();

  return (
    <Container>
      <AppButton title={t('logout')} onPress={handleLogout} />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <AppText>Chat</AppText>
      )}
    </Container>
  );
});
