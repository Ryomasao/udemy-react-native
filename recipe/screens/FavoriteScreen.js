import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { MEALS } from '../data/dummy-data'
import MealList from '../components/MealList'
import HeaderButton from '../components/HeaderButton'

const FavoriteScreen = props => {
  return (
    <View style={styles.screen}>
      <MealList meals={MEALS} navigation={props.navigation} />
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