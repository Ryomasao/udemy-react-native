import React from 'react'
import { FlatList, View } from 'react-native'

import ProductItem from '../components/ProductItem'

const ProductList = ({ availableProducts }) => {
  const renderItem = ({ item }) => {
    return (
      <ProductItem
        title={item.title}
        imageUrl={item.imageUrl}
        price={item.price}
        description={item.description}
      />
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
