import React from 'react';
import { StyleSheet } from 'react-native';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { ToastService } from './src/modules/Toast/toastService';
import { RootNavigator } from './src/navigation/Root';
import 'reflect-metadata';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <BottomSheetModalProvider>
        <RootNavigator />
      </BottomSheetModalProvider>
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
