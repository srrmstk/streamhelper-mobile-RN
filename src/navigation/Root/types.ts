import { RootRoutes } from './routes';
import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  [RootRoutes.Auth]: undefined;
  [RootRoutes.Main]: undefined;
  [RootRoutes.WebView]: {
    uri: string;
  };
};

export type WebViewRouteProps = RouteProp<RootStackParamList, RootRoutes.WebView>;
