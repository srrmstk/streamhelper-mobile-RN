import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './navigation/Root';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});

export default App;
