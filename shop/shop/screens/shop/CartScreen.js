import React from 'react'
import { View, FlatList, Text, Button, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Color from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as ordersActions from '../../store/actions/orders'

const CartScreen = () => {
  // state.cartはオブジェクトでアイテムをもってるので、配列に置き換える
  const cartItems = useSelector(state => {
    const transformedCartItems = Object.keys(state.cart.items).map(key => ({
      ...state.cart.items[key],
      id: key,
    }))

    // Object.keysの処理順は、決まってない。idでsortされるようにする
    return transformedCartItems.sort((a, b) => (a.id > b.id ? 1 : -1))
  })
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)

  const dispatch = useDispatch()

  const handleRemove = id => {
    dispatch(cartActions.removeFromCart(id))
  }

  const handleOrder = (cartItems, totalAmount) => {
    dispatch(ordersActions.addOrder(cartItems, totalAmount))
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() => handleOrder(cartItems, cartTotalAmount)}
        />
      </View>
      <FlatList
        extraData={cartTotalAmount}
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => handleRemove(item.id)}
            deleteable
          />
        )}
      />
    </View>
  )
}

CartScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'My Cart',
  }
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,

    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Color.accent,
  },
})

export default CartScreen
