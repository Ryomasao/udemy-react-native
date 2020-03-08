import React, { useReducer, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      }
    }
    default:
      return state
  }
}

const Input = ({
  id,
  label,
  isValid,
  errorText,
  initialValue,
  initialValid,
  onInputChange,
  ...restInputProps
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : '',
    isValid: initialValid,
    touched: false,
  })

  useEffect(() => {
    if (inputState.touched) {
      // props.onInputChangeだと、infiniteloopになる？
      // そんなことはないはず。未検証。
      onInputChange(id, inputState.value, inputState.isValid)
    }
  }, [inputState, onInputChange])

  const textChangeHandler = text => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid })
  }

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR })
  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...restInputProps}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && <Text>{errorText}</Text>}
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
