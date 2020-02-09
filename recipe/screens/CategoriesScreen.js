import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    const onPress = () => {
      props.navigation.navigate({
        routeName: 'CategoryMeals',
        params: {
          categoryId: itemData.item.id,
        },
      })
    }
    return <CategoryGridTile category={itemData.item} onPress={onPress} />
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderGridItem}
      keyExtractor={item => item.id}
      numColumns={2}
    />
  )
}

// Navigationでラップされたコンポーネントのヘッダーのタイトル
// defaultはRouteNameが設定されてるっぽい
CategoriesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Meals Categories',
    // 他に設定できるオプションは公式を見よう
    // https://reactnavigation.org/docs/en/next/headers.html#setting-the-header-title
    // see MealsNabigation.js 共通の設定はそっちに書くことができる
    //headerStyle: {
    //  backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    //},
    //headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '',
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

const styles = StyleSheet.create({})

export default CategoriesScreen
