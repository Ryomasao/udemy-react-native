import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native'

import { CATEGORIES } from '../data/dummy-data'
import Colors from '../constants/Color'

const CategoriesScreen = props => {
  const renderGridItem = itemData => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate({ routeName: 'CategoryMeals' })
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
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '',
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
