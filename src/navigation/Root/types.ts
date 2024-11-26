import { ERootRoutes } from './routes';
import { RouteProp } from '@react-navigation/native';

export type TRootNavigator = {
  [ERootRoutes.Auth]: undefined;
  [ERootRoutes.Main]: undefined;
  [ERootRoutes.WebView]: {
    uri: string;
  };
};

export type WebViewRouteProps = RouteProp<TRootNavigator, ERootRoutes.WebView>;
