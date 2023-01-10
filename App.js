import React, { useState } from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from "./store/ConfigureStore";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//***** Screens *****//
import SplashScreen from "./src/Screens/SplashScreen";
import HomeScreen from './src/Screens/HomeScreen';



const RootStack = createStackNavigator();

const StackNav = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="SplashScreen"
          options={{ headerShown: false }}
          component={SplashScreen} />

        <RootStack.Screen
          name="HomeScreen"
          options={{ headerShown: false }}
          component={HomeScreen} />

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  const store = cfgStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StackNav />
      </PersistGate>
    </Provider>
  )
}

export default App;
