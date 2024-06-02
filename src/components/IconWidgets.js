import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoteBookIcon from '../assets/note-book.svg';
import BlueBookIcon from '../assets/blue-book.svg';


const IconWidgets = ({ navigation }) => {
    return (
        <View style={[styles.iconsContainer]}>
            <NoteBookIcon width={100} height={100} onPress={() => navigation.navigate('Anteckningar')}  />
            {/* <BlueBookIcon width={100} height={100} /> */}
        </View>
    )
}

export default IconWidgets

const styles = StyleSheet.create({
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
})