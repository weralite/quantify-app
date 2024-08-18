import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoteBookIcon from '../../assets/images/note-book.svg';


const IconHolder = ({ navigation }) => {
    return (
        <View style={[styles.iconsContainer]}>
            <NoteBookIcon width={100} height={120} onPress={() => navigation.navigate('Anteckningar')} />
        </View>
    )
}

export default IconHolder

const styles = StyleSheet.create({
    iconsContainer: {

        // backgroundColor: '#fff',
        // width: 130,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Elevation for Android
        elevation: 5,

    },
})