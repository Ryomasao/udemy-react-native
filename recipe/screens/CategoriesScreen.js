import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const CategoryScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Screen</Text>
      <Button
        title="Go to Meals!"
        onPress={() => {
          // ofcourse you can simply navigate('CategoryMeals)
          // navigateの他にpush()も使える
          // pushの場合、今いるScreenと同じScreenを指定しても、Stackに積むことができる
          // アンケートサイトみたく一枚のScreen上でナビゲーションをさせたいときに役に立ちそう
          props.navigation.navigate({ routeName: 'CategoryMeals' })
          // また、stackに積みたくないときは、replace()がよさげ
          // ログインページとか、ログイン後にBackでログインページに戻るのはまずいからね
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryScreen
