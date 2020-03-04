import React from 'react'
import { Button, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverViewScreen = props => {
  const availableProducts = useSelector(
    state => state.product.availableProducts
  )

  const { navigation } = props

  const selectItemHandler = ({ id, title }) => {
    // 遷移先のscreenでidをもとにreduxを参照する
    // ただし、遷移先のscreenのheaderにタイトルを表示したいので、タイトルも渡す
    // ライフサイクル的にreduxじゃ間に合わない
    navigation.navigate('ProductDetail', { id, title })
  }

  const dispatch = useDispatch()
  const handleAddToCart = product => {
    dispatch(cartActions.addToCart(product))
  }

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={product => product.id}
      renderItem={({ item }) => (
        <ProductItem
          item={item}
          onSelect={() => selectItemHandler({ id: item.id, title: item.title })}
        >
          <Button
            color={Colors.primary}
            title="View Detail"
            onPress={() =>
              selectItemHandler({ id: item.id, title: item.title })
            }
          />
          <Button
            color={Colors.primary}
            title="to Card"
            onPress={() => handleAddToCart(item)}
          />
        </ProductItem>
      )}
    />
  )
}

ProductsOverViewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName="ios-cart"
          onPress={() => {
            navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  screen: {
    //flex: 1,
  },
})

export default ProductsOverViewScreen
