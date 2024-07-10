import { createStackNavigator } from '@react-navigation/stack';
import { RootRoutes } from './routes';
import { MainNavigator } from '../Main';
import { AuthNavigator } from '../Auth';
import { WebViewScreen } from '../../screens/WebView';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => (
  <Stack.Navigator initialRouteName={RootRoutes.Auth}>
    <Stack.Screen name={RootRoutes.Auth} component={AuthNavigator} />
    <Stack.Screen name={RootRoutes.Main} component={MainNavigator} />
    <Stack.Screen name={RootRoutes.WebView} component={WebViewScreen} />
  </Stack.Navigator>
);
