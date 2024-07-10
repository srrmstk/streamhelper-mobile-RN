import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainRoutes } from './routes';
import { AlertScreen } from '../../screens/Main/Alerts';
import { ChatScreen } from '../../screens/Main/Chat';
import { StreamInfoScreen } from '../../screens/Main/StreamInfo';
import { RaidScreen } from '../../screens/Main/Raid';

const Tab = createBottomTabNavigator();

export const MainNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name={MainRoutes.Chat} component={ChatScreen} />
    <Tab.Screen name={MainRoutes.Alerts} component={AlertScreen} />
    <Tab.Screen name={MainRoutes.StreamInfo} component={StreamInfoScreen} />
    <Tab.Screen name={MainRoutes.Raid} component={RaidScreen} />
  </Tab.Navigator>
);
