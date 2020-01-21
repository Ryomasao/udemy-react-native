import React from 'react'
import { View, StyleSheet, Button, Image, Text } from 'react-native'

import Color from '../const/colors'
import TitleText from '../components/TitleText'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

const GameOverScreen = ({ roundsNumber, userNumber, onRestart }) => {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          // 画像読み込みの際にfadeのアニメーションも用意してくれてる
          // URLで取得してくるときにはよい。デフォルトは300msになってる？
          //fadeDuaration
          // localImageじゃない場合は、画像のサイズがわからないので、width,heightの指定はしておこおうね
          //source={{uri:''}}
          style={styles.image}
          resizeMethod="auto"
        />
      </View>
      <View style={styles.resultConainter}>
        <BodyText style={styles.resultText}>
          Your phone needed
          <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess
          the number
          <Text style={styles.highlight}>{userNumber}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>RESTART</MainButton>
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
  resultConainter: {
    marginVertical: 15,
    marginHorizontal: 30,
  },
  resultText: {
    textAlign: 'center',
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Color.primary,
  },
})

export default GameOverScreen
