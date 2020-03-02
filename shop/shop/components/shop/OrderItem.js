import React, { useState } from 'react'
import { View, Button, Text, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import CartItem from './CartItem'
import Colors from '../../constants/Colors'

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        title={showDetails ? 'hide Detail' : 'show Detail'}
        color={Colors.primary}
        onPress={() => {
          setShowDetails(prevState => !prevState)
        }}
      />
      {showDetails && (
        <View>
          {items.map(cartItem => (
            <CartItem item={cartItem} key={cartItem.id} />
          ))}
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderRadius: 10,

    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: {
    fontFamily: 'open-sans',
    fontSize: 16,
    color: '#888',
  },
})

export default OrderItem
