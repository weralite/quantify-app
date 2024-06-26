import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import HomeScreen from './src/screens/Home';
import Wood from './src/screens/MenuOptions/Wood.js';
import Gravel from './src/screens/MenuOptions/Gravel.js';
import NotesScreen from './src/screens/Notes';
import DetailsScreen from './src/screens/Placeholder.js'; 

enableScreens();
const Stack = createStackNavigator();

const slideInFromLeft: StackNavigationOptions['cardStyleInterpolator'] = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [-layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Anteckningar"
          component={NotesScreen}
          options={{
            cardStyleInterpolator: slideInFromLeft,
          }} />
        <Stack.Screen
          name="Virkesåtgång"
          component={Wood}
          options={{
            cardStyleInterpolator: slideInFromLeft,
          }} />
        <Stack.Screen
          name="Grusåtgång"
          component={Gravel}
          options={{
            cardStyleInterpolator: slideInFromLeft,
          }} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            cardStyleInterpolator: slideInFromLeft,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;