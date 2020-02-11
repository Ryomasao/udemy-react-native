import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealItem from '../components/MealItem'

const MealList = ({ meals, navigation }) => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

  const renderMealItem = itemData => {
    const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)

    const onSelectMeal = () => {
      navigation.navigate({
        routeName: 'MealDetail',
        params: {
          mealId: itemData.item.id,
          mealTitle: itemData.item.title,
          isFav: isFavorite,
        },
      })
    }

    return <MealItem {...itemData.item} onSelectMeal={onSelectMeal} />
  }
  return (
    <View style={styles.list}>
      <FlatList
        data={meals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItem}
        style={{ width: '100%' }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MealList
