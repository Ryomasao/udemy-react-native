import React from 'react'
import { FlatList, View } from 'react-native'

import ProductItem from '../components/ProductItem'

const ProductList = ({ availableProducts, onSelect, onAddToCart }) => {
  const renderItem = ({ item }) => {
    return (
      <ProductItem item={item} onSelect={onSelect} onAddToCart={onAddToCart} />
    )
  }

  return (
    <FlatList
      data={availableProducts}
      keyExtractor={product => product.id}
      renderItem={renderItem}
    />
  )
}

export default ProductList
