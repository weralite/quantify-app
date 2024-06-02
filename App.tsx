import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { enableScreens } from 'react-native-screens'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/Header'; 
import Menu from './src/components/Menu';
import Wood from './src/screens/Wood';
import NotesScreen from './src/screens/Notes';
import IconWidgets from './src/components/IconWidgets';

enableScreens();
const Stack = createStackNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header />
      <IconWidgets navigation={navigation} />
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

function DetailsScreen() {
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView>
      <Text>Details Screen</Text>
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
        options={{ headerShown: false }} />

        <Stack.Screen name="Notes" component={NotesScreen} />


        <Stack.Screen name="Virkesåtgång" component={Wood} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;