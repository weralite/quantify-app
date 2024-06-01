import { StyleSheet, Text, View, Dimensions, Button } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import React from 'react'
import SubmitButton from '../buttons/SubmitButton'
import ExitButton from '../buttons/ExitButton';
import InputField from '../inputs/InputField'

const TestSection = () => {
  const [selectedWidth, setSelectedWidth] = React.useState('120');
  const [area, setArea] = React.useState('');
  const [result, setResult] = React.useState(0);

  const screenWidth = Dimensions.get('window').width;

  const calculateResult = () => {
    const selectedWidthInMeters = 1000 / parseInt(selectedWidth);
    const calculatedResult = selectedWidthInMeters * parseFloat(area);
    setResult(calculatedResult.toFixed(2));
  };

  const handleAreaChange = (newArea) => {
    setArea(newArea);
  };

  const handleSelectedWidthChange = (newSelectedWidth) => {
    setSelectedWidth(newSelectedWidth);
  };

  const handleSubmit = () => {
    if (area !== '') {
      calculateResult();
    }
  };

  const handleReset = () => {
    setResult(0);
  };

  return (
    <View style={[styles.sectionContainer]}>

      <View>
        <Text style={[styles.sectionHeader]}>Headline</Text>
        <Text style={[styles.sectionContent]}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</Text>
      </View>


      <View style={[styles.inputContainer]}>

        <InputField
          placeholder="M2"
          onChangeText={handleAreaChange}
          value={area}
          keyboardType="numeric" />



        <View style={{ height: 40, justifyContent: 'center', borderWidth: 1, borderColor: 'gray' }}>
          <Picker
            selectedValue={selectedWidth}
            style={{ width: screenWidth * 0.33 }}
            onValueChange={handleSelectedWidthChange}>

            <Picker.Item label="95 mm" value="95" />
            <Picker.Item label="120 mm" value="120" />
            <Picker.Item label="145 mm" value="145" />

          </Picker>
        </View>

        <SubmitButton title="Submit" onPress={handleSubmit} />

      </View>

      {result !== 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Result: {result} LPM</Text>
          <ExitButton title="X" onPress={handleReset} />
        </View>
      )}
    </View>
  )
}

export default TestSection

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
})