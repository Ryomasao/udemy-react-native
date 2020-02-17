import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import ProductList from '../../components/shop/ProductList'
import * as cartActions from '../../store/actions/cart'
import HeaderButton from '../../components/UI/HeaderButton'

const ProductsOverViewScreen = props => {
  const availableProducts = useSelector(
    state => state.product.availableProducts
  )

  const { navigation } = props

  const onSelectProduct = ({ id, title }) => {
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
    <View style={styles.screen}>
      <ProductList
        availableProducts={availableProducts}
        onSelect={onSelectProduct}
        onAddToCart={handleAddToCart}
      />
    </View>
  )
}

ProductsOverViewScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'All Products',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName="ios-cart" onPress={() => {}} />
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
