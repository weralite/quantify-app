import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NoteBookIcon from '../../assets/images/note-book.svg';


const IconHolder = ({ navigation }) => {
    return (
        <View style={[styles.iconsContainer]}>
            <NoteBookIcon width={150} height={150} onPress={() => navigation.navigate('Anteckningar')}  />
        </View>
    )
}

export default IconHolder

const styles = StyleSheet.create({
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 20,
    },
})