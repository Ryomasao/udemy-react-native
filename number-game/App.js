import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Header from './components/Header'
import GameScreen from './screens/GameScreen'
import StartGameScreens from './screens/StartGameScreen'
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
  // Promiseを返す
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [isDataLoaded, setisDataLoaded] = useState(false)

  // キャッシュやfontのファイルを読み込みたい場合、その読み込みは非同期になる
  // 読み込みが完了するまではコンポーネントを非表示にする
  // expoが用意しているコンポーネントを使うと、便利とのこと
  if (!isDataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        // startAsyncに渡した関数が返すPromsieがresloveされると実行される
        onFinish={() => setisDataLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber)
    setGuessRounds(0)
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds)
  }

  let content = <StartGameScreens onStart={startGameHandler} />

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    )
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
})
