import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from './routes';
import { LoginScreen } from '../../screens/Auth/Login';

const Stack = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AuthRoutes.Login} component={LoginScreen} />
    </Stack.Navigator>
  );
};
