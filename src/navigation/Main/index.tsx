import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AlertScreen } from 'screens/Main/Alerts';
import { ChatScreen } from 'screens/Main/Chat';
import { RaidScreen } from 'screens/Main/Raid';
import { StreamInfoScreen } from 'screens/Main/StreamInfo';

import { EMainRoutes } from './routes';
import { TMainNavigator } from './types';

const Tab = createBottomTabNavigator<TMainNavigator>();

export const MainNavigator: React.FC = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name={EMainRoutes.Chat}
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name={'message'} color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={EMainRoutes.Alerts}
      component={AlertScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon
            name={'system-security-update-warning'}
            color={color}
            size={size}
          />
        ),
      }}
    />
    <Tab.Screen
      name={EMainRoutes.Raid}
      component={RaidScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name={'north-east'} color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name={EMainRoutes.StreamInfo}
      component={StreamInfoScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name={'video-settings'} color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
