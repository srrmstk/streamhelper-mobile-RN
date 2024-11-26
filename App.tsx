import React from 'react';
import { RootNavigator } from './src/navigation/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { ToastService } from './src/modules/Toast/toastService';
import 'reflect-metadata';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <RootNavigator />
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
