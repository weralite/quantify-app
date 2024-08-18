import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import Header from '../components/homescreen/Header';
import Menu from '../components/homescreen/Menu';
import IconHolder from '../components/homescreen/IconHolder';

function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeScreen}>
        <Header />
        <IconHolder navigation={navigation} />
        <Menu navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures SafeAreaView takes up the full height of the screen
  },
  homeScreen: {
    flex: 1, // Ensures homeScreen takes up all available height within SafeAreaView
    flexDirection: 'column',
    justifyContent: 'space-between', // Creates space between the components
    alignItems: 'center', // Centers children horizontally
  },
})

export default HomeScreen;
