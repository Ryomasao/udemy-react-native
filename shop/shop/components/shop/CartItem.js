import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const CartItem = ({ item, onRemove, deleteable = false }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Text style={styles.title}>{item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>${item.sum.toFixed(2)}</Text>
        {deleteable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons name="ios-trash" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888',
  },
  title: {
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: 'open-sans-bold',
  },
  amount: {
    fontSize: 16,
    paddingHorizontal: 5,
    fontFamily: 'open-sans-bold',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    marginHorizontal: 10,
  },
})

export default CartItem
