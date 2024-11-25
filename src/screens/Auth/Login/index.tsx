import { SafeAreaView, Button } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/Root/types';
import { getAuthUri } from './helpers';
import { IS_IOS } from '../../../constants/platform';
import { useRootStore } from '../../../hooks/useRootStore';
import { RootRoutes } from '../../../navigation/Root/routes';

export const LoginScreen = observer(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { authStore, userStore } = useRootStore();

  const handleLogin = async () => {
    const uri = getAuthUri();

    if (IS_IOS) {
      // TODO: implement auth for iOS
      navigation.navigate(RootRoutes.WebView, { uri });
      return;
    }

    const result = await authStore.auth(uri);

    if (result) {
      // TODO: navigate to main app
      return;
    }
  };

  return (
    <SafeAreaView>
      <Button title={'Auth'} onPress={handleLogin} />
      <Button title={'Get User'} onPress={() => userStore.getUser()} />
    </SafeAreaView>
  );
});
