import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'

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
CategoriesScreen.navigationOptions = {
  headerTitle: 'Meals Categories',
  // 他に設定できるオプションは公式を見よう
  // https://reactnavigation.org/docs/en/next/headers.html#setting-the-header-title
  // see MealsNabigation.js 共通の設定はそっちに書くことができる
  //headerStyle: {
  //  backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  //},
  //headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '',
}

const styles = StyleSheet.create({})

export default CategoriesScreen
