import { SafeAreaView, Button } from 'react-native';
import { observer } from 'mobx-react';
import { getAuthUri } from './helpers';
import { IS_IOS } from '../../../constants/platform';
import { useRootStore } from '../../../hooks/useRootStore';
import { ERootRoutes } from '../../../navigation/Root/routes';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { EMainRoutes } from '../../../navigation/Main/routes';

export const LoginScreen = observer(() => {
  const navigation = useAppNavigation();

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
    <SafeAreaView>
      <Button title={'Auth'} onPress={handleLogin} />
    </SafeAreaView>
  );
});
