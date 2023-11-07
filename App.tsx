import React from 'react';
import NewsListView from './App/Presentation/Views/NewsListView';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import NewsDetailView from './App/Presentation/Views/NewsDetailView';

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetailView: {
    url: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

enum Views {
  NewsList = 'NewsList',
  NewsDetailView = 'NewsDetailView',
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Views.NewsList}
          component={NewsListView}
          options={{
            title: '',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Views.NewsDetailView}
          options={{
            title: '',
            headerBackTitle: 'Back',
            headerTintColor: 'black',
            headerShown: true,
          }}>
          {({route, navigation}) => (
            <NewsDetailView navigation={navigation} route={route} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
