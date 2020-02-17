import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const renderItem = ({ item }) => {
  return (
    <View>
      <Text>{item.productTitle}</Text>
      <Text>{item.productPrice}</Text>
      <Text>{item.quantity}</Text>
      <Text>{item.sum}</Text>
    </View>
  )
}

const CartScreen = () => {
  // state.cartはオブジェクトでアイテムをもってるので、配列に置き換える
  const cartItems = useSelector(state =>
    Object.keys(state.cart.items).map(key => ({
      ...state.cart.items[key],
      id: key,
    }))
  )
  return (
    <View>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'My Cart',
  }
}

export default CartScreen
