import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { ToastService } from './src/modules/Toast/toastService';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast config={ToastService.config} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

export default App;
