import PRODUCTS from '../../data/dummy-data'
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from '../actions/product'
import Product from '../../models/product'

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT: {
      const data = action.productData
      const id = new Date().toString()
      const ownerId = 'u1'
      const newProduct = new Product(
        id,
        ownerId,
        data.title,
        data.imageUrl,
        data.description,
        data.price
      )

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    }
    case UPDATE_PRODUCT: {
      const data = action.productData
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.id
      )
      const updatedProduct = new Product(
        state.userProducts[productIndex].id,
        state.userProducts[productIndex].ownerId,
        data.title,
        data.imageUrl,
        data.description,
        state.userProducts[productIndex].price
      )

      // 配列の順番を保持したいんだと思う
      // ソートしなおしたほうが楽な気がするな
      const updatedUserProducts = [...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct
      const availableProductsIndex = state.availableProducts.findIndex(
        prod => prod.id === action.id
      )
      const updatedAvalableProducts = [...state.availableProducts]
      updatedAvalableProducts[availableProductsIndex] = updatedProduct

      return {
        ...state,
        availableProducts: updatedAvalableProducts,
        userProducts: updatedUserProducts,
      }
    }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.id
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.id
        ),
      }
    default:
      return state
  }
}
