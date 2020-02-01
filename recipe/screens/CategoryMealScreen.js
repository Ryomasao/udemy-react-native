import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const CategoryMealScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>The Category Meal Screen</Text>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryMealScreen
