import WebView from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { WebViewRouteProps } from '../../navigation/Root/types';
import { StyleSheet } from 'react-native';

export const WebViewScreen = () => {
  const { params } = useRoute<WebViewRouteProps>();

  return (
    <WebView
      style={styles.webView}
      source={{ uri: params.uri }}
      startInLoadingState={true}
      sharedCookiesEnabled={true}
      thirdPartyCookiesEnabled={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
