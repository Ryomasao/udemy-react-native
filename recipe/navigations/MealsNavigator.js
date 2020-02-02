import { Platform } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Colors from '../constants/Color'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealScreen'
import MealDetailScreen from '../screens/MealDetailScreen'

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

export default createAppContainer(MealsNavigator)
