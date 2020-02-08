import React from 'react'
import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// マテリアルデザイン版のtab
// https://reactnavigation.org/docs/en/4.x/material-bottom-tab-navigator.html
//import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Color'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FavoriteScreen from '../screens/FavoriteScreen'

const MealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoryMeals: {
      screen: CategoryMealsScreen,
      navigationOptions: {
        // 個別のScreen配下に置きたいならここに書く
        //headerStyle: {
        //  backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        //},
        //headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '',
        // 優先順位は、全体 > 個別 > コンポーネントでmergeされてく
      },
    },
    MealDetail: MealDetailScreen,
  },
  {
    // Screenが下からでてくるようになる
    // mode: 'modal'
    // 初回にルートされるScreen
    // initialRouteName: ''
    // 全体に適用させたいならこっち
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
      },
      headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : '',
    },
  }
)

const MealsFavTabNavigator = createBottomTabNavigator(
  {
    Meals: {
      // Navigatorに他のNavigatorを含むこともできる！
      screen: MealsNavigator,
      navigationOptions: {
        tabBarIcon: tabInfo => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          )
        },
      },
    },
    // screenを省略したshorthand
    Favorite: {
      screen: FavoriteScreen,
      navigationOptions: {
        //tabBarLabel: 'youcanchangeIconString',
        tabBarIcon: tabInfo => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          )
        },
      },
    },
  },
  {
    tabBarOptions: {
      // 選択済みのtabの文字色
      activeTintColor: Colors.accentColor,
    },
  }
)

export default createAppContainer(MealsFavTabNavigator)
