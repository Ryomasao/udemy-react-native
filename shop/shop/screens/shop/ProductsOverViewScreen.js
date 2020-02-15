import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import ProductList from '../../components/ProductList'

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

  return (
    <View style={styles.screen}>
      <ProductList
        availableProducts={availableProducts}
        onSelect={onSelectProduct}
      />
    </View>
  )
}

ProductsOverViewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'All Products',
  }
}

const styles = StyleSheet.create({
  screen: {
    //flex: 1,
  },
})

export default ProductsOverViewScreen
