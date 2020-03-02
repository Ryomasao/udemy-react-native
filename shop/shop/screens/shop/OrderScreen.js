import React from 'react'
import { Text, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrderScreen = props => {
  const orders = useSelector(state => state.order.orders)

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        // ここがインスタンスからplainの境界
        <OrderItem
          amount={item.totalAmount}
          date={item.readbleDate}
          items={item.items}
        />
      )}
    />
  )
}

OrderScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {},
})

export default OrderScreen
