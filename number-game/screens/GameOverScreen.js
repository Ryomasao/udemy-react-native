import React from 'react'
import { View, StyleSheet, Button, Image } from 'react-native'

import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
          resizeMethod="contain"
        />
      </View>
      <BodyText>Number of rounds:{roundsNumber}</BodyText>
      <BodyText>Number was:{userNumber}</BodyText>
      <Button title="RESTART" onPress={onRestart} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '80%',
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: 'black',
    marginVertical: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default GameOverScreen
