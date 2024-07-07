import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainRoutes } from './routes';
import { AlertScreen } from '../../screens/main/Alerts';
import { ChatScreen } from '../../screens/main/Chat';
import { StreamInfoScreen } from '../../screens/main/StreamInfo';
import { RaidScreen } from '../../screens/main/Raid';

const Tab = createBottomTabNavigator();

export const MainNavigator: React.FC = () => (
  <Tab.Navigator>
    <Tab.Screen name={MainRoutes.Chat} component={ChatScreen} />
    <Tab.Screen name={MainRoutes.Alerts} component={AlertScreen} />
    <Tab.Screen name={MainRoutes.StreamInfo} component={StreamInfoScreen} />
    <Tab.Screen name={MainRoutes.Raid} component={RaidScreen} />
  </Tab.Navigator>
);
