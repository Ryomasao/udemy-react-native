import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import productReducer from './store/reducers/product'
import cartReducer from './store/reducers/cart'
import ShopNavigator from './navigation/Shopnavigator'

// for perform
enableScreens()

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

const rootReducer = {
  product: productReducer,
  cart: cartReducer,
}

const store = createStore(combineReducers(rootReducer), composeWithDevTools())

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={e => console.log('FontLoads Error', e)}
      />
    )
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  )
}
