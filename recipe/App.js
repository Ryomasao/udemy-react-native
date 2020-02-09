import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { enableScreens } from 'react-native-screens'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import MealsNavigator from './navigations/MealsNavigator'
import mealsReducer from './store/reducer/meals'

// Navigationのパフォーマンスがあがるらしい
// deprecatedされて、enableScrennになってた
//useScreens()
enableScreens()

const rootRuducer = combineReducers({ meals: mealsReducer })
const store = createStore(rootRuducer)

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

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
      <MealsNavigator />
    </Provider>
  )
}
