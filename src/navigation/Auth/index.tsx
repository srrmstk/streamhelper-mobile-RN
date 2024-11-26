import { createStackNavigator } from '@react-navigation/stack';
import { EAuthRoutes } from './routes';
import { LoginScreen } from '../../screens/Auth/Login';
import { TAuthNavigator } from './types';
import { EntryScreen } from '../../screens/Auth/Entry';

const Stack = createStackNavigator<TAuthNavigator>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={EAuthRoutes.Entry}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={EAuthRoutes.Entry} component={EntryScreen} />
      <Stack.Screen name={EAuthRoutes.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};
