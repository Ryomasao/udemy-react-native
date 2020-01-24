import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native'
// アイコンも提供してる。すごい
import { Ionicons } from '@expo/vector-icons'

import { width } from '../utils/device'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

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

// bindのメモ
//
//  function hoge(item, item2, item3) {
//    console.log(item, item2, item3);
//  }
//  const n = hoge.bind(this, 2, 3);
//  n(1);
//
//  2 3 1
//
// bindで渡した引数は、arg0,arg1にセットされ、bindで生成した関数に渡した引数は、最後にセットされている

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
)

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice)
  const [currentGuess, setCurrentGuess] = useState(initialGuess)
  const [pastGuesses, setPastGuess] = useState([initialGuess])

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length)
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
      // Listのkeyに指定した
      // + 1しないロジックだとminが重複することがあるのかしら
      currentLow.current = currentGuess + 1
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    )

    setCurrentGuess(nextNumber)

    setPastGuess(pastGuesses => [nextNumber, ...pastGuesses])
  }

  return (
    <View style={styles.screen}>
      <Text>Oppnents`s Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHanlder.bind(this, 'lower')}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={() => nextGuessHanlder('greater')}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        {/*
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
         */}
        <FlatList
          // keyをitemそのものにする
          // またkeyはstringじゃなきゃだめ
          keyExtractor={item => item.toString()}
          data={pastGuesses}
          //renderItem={item => renderListItem(item, pastGuesses.length)}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
      </View>
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
    width: 400,
    maxWidth: '80%',
  },
  listContainer: {
    width: width > 350 ? '60%' : '80%',
    // androidだと以下が必要
    flex: 1,
  },
  // scrollViewにstyleをあてるにはcontentContainerStyleを使う
  list: {
    // itemが多い場合にスクロールさせたいのでflexGrowを指定する
    //flex: 1,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default GameScreen
