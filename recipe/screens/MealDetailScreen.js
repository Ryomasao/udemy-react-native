import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { MEALS } from '../data/dummy-data'
import HeaderButton from '../components/HeaderButton'

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId')
  const meal = MEALS.find(meal => meal.id === mealId)

  return (
    <View style={styles.screen}>
      <Text>{meal.title}</Text>
    </View>
  )
}

// DynamicSetiing
MealDetailScreen.navigationOptions = navigationData => {
  const mealId = navigationData.navigation.getParam('mealId')
  const meal = MEALS.find(meal => meal.id === mealId)

  return {
    headerTitle: meal.title,
    // ヘッダーのカスタマイズ
    // jsxを直接書くこともできるけど、プラットフォームごとの調整がかなりしんどい
    //headerRight: <Text>Fav </Text>,
    // react-navigation-header-buttonsのパッケージを使う
    // HeaderButtonsコンポーネントに、作ったHeaderComponentを渡すのがちょっと謎
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={() => {}} />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MealDetailScreen
