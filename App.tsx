import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import Wood from './src/screens/MenuOptions/Wood';
import Gravel from './src/screens/MenuOptions/Gravel';
import NotesScreen from './src/screens/NoteScreen';
import DetailsScreen from './src/screens/Placeholder';

const Stack = createStackNavigator();

const expandFromClick: StackNavigationOptions['cardStyleInterpolator'] = ({ current, next, layouts, position }) => {
  const { width, height } = Dimensions.get('window');

  // Use default values if route params are not provided
  const originX = position?.params?.originX || width / 2;
  const originY = position?.params?.originY || height / 2;

  const translateX = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [originX - width / 2, 0],
  });

  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [originY - height / 2, 0],
  });

  const scale = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.1, 1],
  });

  return {
    cardStyle: {
      transform: [
        { translateX },
        { translateY },
        { scale },
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Anteckningar"
          component={NotesScreen}
          options={{ cardStyleInterpolator: expandFromClick }}
        />
        <Stack.Screen
          name="Virkesåtgång"
          component={Wood}
          options={{ cardStyleInterpolator: expandFromClick }}
        />
        <Stack.Screen
          name="Grusåtgång"
          component={Gravel}
          options={{ cardStyleInterpolator: expandFromClick }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ cardStyleInterpolator: expandFromClick }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
