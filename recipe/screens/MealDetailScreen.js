import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { MEALS } from '../data/dummy-data'

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
