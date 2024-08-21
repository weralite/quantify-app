import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import Header from '../components/homescreen/HeaderThree';
import HeaderTwo from '../components/homescreen/Headertwo';
import Menu from '../components/homescreen/Menu';
import Footer from '../components/homescreen/Footer';

function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeScreen}>
        <View style={styles.headerContainer}>
          <Header />
          <HeaderTwo navigation={navigation} />
        </View>
        <View style={styles.menu}>
          <Menu navigation={navigation} />
        </View>
        <Footer navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  homeScreen: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: -10, // Negative margin to create -10px space between headers
  },
  menu: {
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
