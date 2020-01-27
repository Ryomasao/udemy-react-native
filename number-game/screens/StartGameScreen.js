import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'

import Colors from '../const/colors'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import Input from '../components/Input'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreens = ({ onStart }) => {
  const [enteredValue, setEntededValue] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState()

  const numberInputHandler = inputText => {
    setEntededValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEntededValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }

    setConfirmed(true)
    setEntededValue('')
    setSelectedNumber(chosenNumber)
  }

  let confirmedOutPut

  if (confirmed) {
    confirmedOutPut = (
      <Card style={styles.summaryConatiner}>
        <Text>you selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => onStart(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    )
  }

  return (
    <ScrollView>
      {/* 
      KeyboardAboidingViewで、keyboardが表示されたときに、Viewにかぶらないようにoffset分ずらしてくれる！
      behaviorには他にもpaddingとかある。違いは公式をみよう。
      */}
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss()
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <Text>Select a Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    color={Colors.primary}
                    onPress={confirmInputHandler}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutPut}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  // RNのfontは子要素に適用されない
  // なので、全体に適用させたい場合、以下の2案がある
  // 1.フォントを適用させたコンポーネントをつくる
  // 2.constとかにDefaultStyleをStyleSheet.create()で用意して、コンポーネントのstyleに当てる
  // Text in Textの場合、子要素に適用される
  // https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15420214#questions
  title: {
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 100,
  },
  summaryConatiner: {
    marginTop: 20,
  },
})

export default StartGameScreens
