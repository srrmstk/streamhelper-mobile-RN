import { createStackNavigator } from '@react-navigation/stack';
import { RootRoutes } from './routes';
import { MainNavigator } from '../main';
import { AuthNavigator } from '../auth';

const Stack = createStackNavigator();

export const RootNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName={RootRoutes.Auth}>
    <Stack.Screen name={RootRoutes.Auth} component={AuthNavigator} />
    <Stack.Screen name={RootRoutes.Main} component={MainNavigator} />
  </Stack.Navigator>
);
