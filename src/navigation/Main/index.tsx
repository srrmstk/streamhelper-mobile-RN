import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EMainRoutes } from './routes';
import { AlertScreen } from '../../screens/Main/Alerts';
import { ChatScreen } from '../../screens/Main/Chat';
import { StreamInfoScreen } from '../../screens/Main/StreamInfo';
import { RaidScreen } from '../../screens/Main/Raid';
import { TMainNavigator } from './types';

const Tab = createBottomTabNavigator<TMainNavigator>();

export const MainNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name={EMainRoutes.Chat} component={ChatScreen} />
    <Tab.Screen name={EMainRoutes.Alerts} component={AlertScreen} />
    <Tab.Screen name={EMainRoutes.StreamInfo} component={StreamInfoScreen} />
    <Tab.Screen name={EMainRoutes.Raid} component={RaidScreen} />
  </Tab.Navigator>
);
