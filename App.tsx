import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { enableScreens } from 'react-native-screens'
import { Button, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from './src/components/Header'; // Import your Header component
import MenuButton from './src/components/buttons/MenuButton';
import InputField from './src/components/inputs/InputField';
import QuantTest from './src/screens/Test';

enableScreens();
const Stack = createStackNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <MenuButton title="TEST" onPress={() => navigation.navigate('QuantTest')} />
        <MenuButton title="Go to Details" onPress={() => navigation.navigate('Details')} />
        <MenuButton title="Go to Details" onPress={() => navigation.navigate('Details')} />
        <MenuButton title="Go to Details" onPress={() => navigation.navigate('Details')} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailsScreen() {
  const [value, setValue] = React.useState('');
  return (
    <SafeAreaView>
      <Text>Details Screen</Text>
      <InputField
        placeholder="Enter quantity"
        onChangeText={setValue}
        value={value}
        keyboardType="numeric"
      />
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

        <Stack.Screen name="QuantTest" component={QuantTest} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;