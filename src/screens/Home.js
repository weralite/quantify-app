import React, { useState, useEffect } from 'react';
import { SafeAreaView, ActivityIndicator, View } from 'react-native';
import Header from '../components/Header';
import Menu from '../components/Menu';
import IconHolder from '../components/IconHolder';

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
    <SafeAreaView style={{ gap: 60 }}>
      <Header />
      <IconHolder navigation={navigation} />
      <Menu navigation={navigation} />
    </SafeAreaView>
  );
}

export default HomeScreen;
