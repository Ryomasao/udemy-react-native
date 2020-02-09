import React from 'react'
import { StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'

const CategoryMealScreen = props => {
  const catId = props.navigation.getParam('categoryId')

  const availableMeals = useSelector(state => state.meals.filteredMeals)

  const displayMeals = availableMeals.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  )

  return <MealList meals={displayMeals} navigation={props.navigation} />
}

// DynamicSetiing
CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId')
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return {
    headerTitle: selectedCategory.title,
  }
}

const styles = StyleSheet.create({})

export default CategoryMealScreen
