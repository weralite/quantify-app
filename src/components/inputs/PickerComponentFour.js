import React, { useState, useCallback, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, FlatList, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomPicker = ({ items, selectedValue, onValueChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const openModal = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  }, []);

  const renderItem = useCallback(({ item }) => (
    <TouchableOpacity onPress={() => {
      onValueChange(item);
      closeModal();
    }}>
      <Text style={{ textAlign: 'center', padding: 20, fontSize: 20 }}>{item}</Text>
    </TouchableOpacity>
  ), [closeModal, onValueChange]);

  return (
    <View>
      <TouchableOpacity onPress={openModal} style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 10, paddingRight: 10 }}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: 'black' }}>{selectedValue}</Text>
        <Icon name="caret-down" size={18} color="black" />
      </TouchableOpacity>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <Animated.View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
            opacity: fadeAnim, // Bind opacity to animated value
          }}
          onStartShouldSetResponder={() => true}
          onResponderRelease={closeModal}
        >
          <TouchableOpacity
            style={{ backgroundColor: 'white', padding: 30, borderRadius: 5, width: '80%' }}
            activeOpacity={1}
            onStartShouldSetResponder={() => true}
          >
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
          </TouchableOpacity>
        </Animated.View>
      </Modal>
    </View>
  );
};

export default CustomPicker;