import { Text, SafeAreaView, Button, Linking } from 'react-native';
import { observer } from 'mobx-react';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootRoutes } from '../../../navigation/Root/routes';
import { RootStackParamList } from '../../../navigation/Root/types';
import { getAuthUri } from './helpers';
import { IS_IOS } from '../../../constants/platform';

export const LoginScreen = observer(() => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    const uri = getAuthUri();

    if (IS_IOS) {
      navigation.navigate(RootRoutes.WebView, {
        uri,
      });
      return;
    }

    await Linking.openURL(uri);
  };

  return (
    <SafeAreaView>
      <Text>Hello world</Text>
      <Button title={'Auth'} onPress={handleLogin} />
    </SafeAreaView>
  );
});
