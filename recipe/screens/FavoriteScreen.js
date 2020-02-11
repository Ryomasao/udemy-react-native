import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import MealList from '../components/MealList'
import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'

const FavoriteScreen = props => {
  const favoriteMeals = useSelector(state => state.meals.favoriteMeals)

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.screen}>
        <DefaultText> No Favorite meals found. Start adding some!</DefaultText>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <MealList meals={favoriteMeals} navigation={props.navigation} />
    </View>
  )
}

FavoriteScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            // 便利な関数
            navData.navigation.toggleDrawer()
          }}
        />
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

export default FavoriteScreen
