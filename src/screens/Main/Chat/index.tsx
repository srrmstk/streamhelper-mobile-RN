import { View, Text, Button } from 'react-native';
import { observer } from 'mobx-react';
import { useRootStore } from '../../../hooks/useRootStore';
import { useAppNavigation } from '../../../hooks/useAppNavigation';
import { ERootRoutes } from '../../../navigation/Root/routes';
import { EAuthRoutes } from '../../../navigation/Auth/routes';

export const ChatScreen = observer(() => {
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
    <View>
      <Text>This is Chat screen</Text>
      <Button title={'Logout'} onPress={handleLogout} />
    </View>
  );
});
