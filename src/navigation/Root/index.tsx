import { createStackNavigator } from '@react-navigation/stack';
import { ERootRoutes } from './routes';
import { MainNavigator } from '../Main';
import { AuthNavigator } from '../Auth';
import { WebViewScreen } from '../../screens/WebView';
import { TRootNavigator } from './types';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator<TRootNavigator>();

export const RootNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={ERootRoutes.Auth}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={ERootRoutes.Auth} component={AuthNavigator} />
      <Stack.Screen name={ERootRoutes.Main} component={MainNavigator} />
      <Stack.Screen name={ERootRoutes.WebView} component={WebViewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
