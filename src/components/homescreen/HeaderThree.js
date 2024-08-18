import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import BuildingImage from '../../assets/images/building.webp'; // Ensure the path is correct

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={BuildingImage}
        style={styles.image} // Apply styling to make the image large
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: 200, // Fixed height for the header
    width: '100%', // Full width of the container
    overflow: 'hidden', // Hide overflow to crop the bottom part of the image
  },

  image: {
    width: '100%', // Cover the full width of the container
    height: '100%', // Cover the full height of the container
    resizeMode: 'cover', // Ensure the image fills the area and is cropped from the bottom
    position: 'absolute', // Position the image absolutely
    top: 0, // Align the image to the top
  },
});
