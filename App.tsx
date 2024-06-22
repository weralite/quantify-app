import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { enableScreens } from 'react-native-screens'
import { Button, SafeAreaView, ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/Header';
import Menu from './src/components/Menu';
import Wood from './src/screens/Wood';
import NotesScreen from './src/screens/Notes';
import IconHolder from './src/components/IconHolder';
import { useState, useEffect } from 'react';

enableScreens();
const Stack = createStackNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(true);
  // const backgroundStyle = {
  //   backgroundColor: Colors.lighter,
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View >
    );
  }

  return (
    <SafeAreaView>
      <Header />
      <IconHolder navigation={navigation} />
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

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


function DetailsScreen() {
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView>
      <Text>Placeholder</Text>
    </SafeAreaView>
  );
}

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