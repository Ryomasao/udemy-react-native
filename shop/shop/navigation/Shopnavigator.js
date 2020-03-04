import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import ProductOverViewScreen from '../screens/shop/ProductsOverViewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrderScreen from '../screens/shop/OrderScreen'
import UserProductScreen from '../screens/user/UserProductScreen'

const defaultNavigationOption = {
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
}

const ProductsNavigator = createStackNavigator(
  {
    ProductOverView: ProductOverViewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons name="ios-cart" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOption,
  }
)

const OrderNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrderScreen,
    },
  },
  {
    navigationOptions: {
      // わかりにくい。ドロワー表示した際に表示されるアイコン
      // stackNavigatorの関数にドロワー表示を書いてる
      drawerIcon: drawerConfig => (
        <Ionicons name="ios-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOption,
  }
)

const AdminNavigator = createStackNavigator(
  {
    UserProduct: {
      screen: UserProductScreen,
    },
  },
  {
    navigationOptions: {
      // わかりにくい。ドロワー表示した際に表示されるアイコン
      // stackNavigatorの関数にドロワー表示を書いてる
      drawerIcon: drawerConfig => (
        <Ionicons name="ios-list" size={23} color={drawerConfig.tintColor} />
      ),
    },
    defaultNavigationOptions: defaultNavigationOption,
  }
)

// drawer配下はstachじゃなくって直接screenをいれてもいい
// ただ基本Stackのヘッダーを共有したいから、Stackを挟む事が多いのかな
// また、ドロワーの制御は、コンポーネントのヘッダー側でトグルの関数を入れることで使える。
// drawer
//  stack
//  stack
const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
    },
    Orders: {
      screen: OrderNavigator,
    },
    Admin: {
      screen: AdminNavigator,
    },
  },
  { contentOptions: {} }
)

export default createAppContainer(ShopNavigator)
