import React from 'react'
import { View, Text, Button, FlatList, StyleSheet } from 'react-native'

import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealItem from '../components/MealItem'

const CategoryMealScreen = props => {
  const renderMealItem = itemData => {
    return <MealItem {...itemData.item} />
  }

  const catId = props.navigation.getParam('categoryId')

  const displayMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  )

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  )

  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
      <Text>{displayMeals.title}</Text>
      <Button
        title="Go to Meals"
        onPress={() => {
          props.navigation.navigate('MealDetail')
        }}
      />
      <Button
        title="Back"
        onPress={() => {
          props.navigation.goBack()
          // popも使える。
        }}
      />
    </View>
  )
}

// DynamicSetiing
CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryMealScreen
