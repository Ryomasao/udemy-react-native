import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Alert } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min, max, exclude) => {
  // 切り上げ
  min = Math.ceil(min)
  // 切り捨て
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const GameScreen = ({ userChoice, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, userChoice)
  )

  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds)
    }
  }, [currentGuess, userChoice, onGameOver])

  const nextGuessHanlder = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'you know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ])
      return
    }

    if (direction === 'lower') {
      currentHigh.current = currentGuess
    } else {
      currentLow.current = currentGuess
    }
    setCurrentGuess(
      generateRandomBetween(
        currentLow.current,
        currentHigh.current,
        currentGuess
      )
    )

    setRounds(currentRounds => currentRounds + 1)
  }

  return (
    <View style={styles.screen}>
      <Text>Oppnents`s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHanlder.bind(this, 'lower')} />
        <Button title="GREATER" onPress={() => nextGuessHanlder('greater')} />
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
})

export default GameScreen
