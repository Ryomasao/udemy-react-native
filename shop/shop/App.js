import React from 'react'
import { SafeAreaView } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import productReducer from './store/reducers/product'
import ProductOverViewScreen from './screens/shop/ProductsOverViewScreen'

const rootReducer = {
  product: productReducer,
}

const store = createStore(combineReducers(rootReducer))

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <ProductOverViewScreen />
      </SafeAreaView>
    </Provider>
  )
}
