import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Colors from '../constants/Colors'
import ProductOverViewScreen from '../screens/shop/ProductsOverViewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'

const ProductsNavigator = createStackNavigator(
  {
    ProductOverView: ProductOverViewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTitleStyle: {
        fontFamily: 'open-sans-bold',
      },
      headerBackTitleStyle: {
        fontFamily: 'open-sans',
      },
      headerTintColor: 'white',
    },
  }
)

export default createAppContainer(ProductsNavigator)
