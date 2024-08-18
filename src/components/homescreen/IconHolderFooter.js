import { StyleSheet, View } from 'react-native';
import React from 'react';
import NoteBookIcon from '../../assets/images/note-book.svg';

const IconHolder = ({ navigation }) => {
    return (
        <View style={styles.iconsContainer}>
            <View style={styles.iconWrapper}>
                <NoteBookIcon
                    width={45}
                    height={50}
                    onPress={() => navigation.navigate('Anteckningar')}
                />
            </View>
        </View>
    );
};

export default IconHolder;

const styles = StyleSheet.create({
    iconsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 45, // Define the width of the wrapper
        height: 50, // Define the height of the wrapper
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 }, // Increased height offset slightly
        shadowOpacity: 0.1, // Increased opacity for visibility
        shadowRadius: 2, // Increased radius for more visible shadow
        elevation: 2, // Increased elevation for better visibility on Android
        justifyContent: 'center',
        alignItems: 'center',
    },
});
