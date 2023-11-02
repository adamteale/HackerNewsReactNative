import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import NewsListView from './App/Presentation/Views/NewsListView';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import NewsDetailView from './App/Presentation/Views/NewsDetailView';
const Stack = createStackNavigator();

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetailView: {
    url: string;
  };
};

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewsList"
          component={NewsListView}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="NewsDetailView"
          component={NewsDetailView}
          options={{
            title: '',
            headerBackTitle: 'Back',
            headerTintColor: 'black',
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
