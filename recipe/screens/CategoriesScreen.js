import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native'

import { CATEGORIES } from '../data/dummy-data'

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        onPress={() => {
          // paramsを渡すときは以下がshorthand
          // navigate('name', {})
          props.navigation.navigate({
            routeName: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          })
        }}
        style={styles.gridItem}
      >
        <View>
          <Text>{itemData.item.title}</Text>
        </View>
      </TouchableOpacity>
    )
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
})

export default CategoriesScreen
