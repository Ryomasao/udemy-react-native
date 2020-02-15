import React from 'react'
import { useSelector } from 'react-redux'

import ProductList from '../../components/ProductList'

const ProductsOverViewScreen = () => {
  const availableProducts = useSelector(
    state => state.product.availableProducts
  )
  return <ProductList availableProducts={availableProducts} />
}

export default ProductsOverViewScreen
