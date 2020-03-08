import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const Input = ({ label, isValid, errorText, ...restInputProps }) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...restInputProps} />
      {!isValid && <Text>{errorText}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 9,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default Input
