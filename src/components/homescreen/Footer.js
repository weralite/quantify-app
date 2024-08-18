import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import IconHolder from './IconHolderFooter';

const Footer = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.whiteRow}>
        {/* <View style={styles.circle}> 
        <IconHolder navigation={navigation} />
          </View> */}
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    height: 55,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end', // Align the whiteRow at the bottom of the footer
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of the circle
  },

  whiteRow: {
    height: 55,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center', // Align the circle horizontally in the center
    alignItems: 'center',
    position: 'relative', // Needed for absolute positioning of the circle
  },

  circle: {
    backgroundColor: '#fff',
    height: 100,
    width: 100,
    borderRadius: 50, // Half of the height and width to make it a circle
    position: 'absolute',
    top: -35, // Positioning the circle to overflow and create a half-circle effect
    justifyContent: 'center',
    alignItems: 'center',

  },
});
