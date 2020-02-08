import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'

const FavoriteScreen = props => {
  return (
    <View style={styles.screen}>
      <MealList meals={MEALS} navigation={props.navigation} />
    </View>
  )
}

FavoriteScreen.navigationOptions = {
  headerTitle: 'Your Favorites',
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FavoriteScreen
