import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { enableScreens } from 'react-native-screens'
import { Button, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './components/Header'; // Import your Header component
import Menu from './components/Menu'; // Import your Menu component

enableScreens();
const Stack = createStackNavigator();

function MenuScreen({ navigation }: { navigation: any }) {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <Menu />
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  return (
    <SafeAreaView>
      {/* Add your details screen content here */}
    </SafeAreaView>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;