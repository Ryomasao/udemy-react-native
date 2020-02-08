import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import { CATEGORIES, MEALS } from '../data/dummy-data'
import MealItem from '../components/MealItem'

const CategoryMealScreen = props => {
  const renderMealItem = itemData => {
    const onSelectMeal = () => {
      props.navigation.navigate({
        routeName: 'MealDetail',
        params: {
          mealId: itemData.item.id,
        },
      })
    }

    return <MealItem {...itemData.item} onSelectMeal={onSelectMeal} />
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
