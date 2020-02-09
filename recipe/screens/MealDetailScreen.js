import React, { useEffect, useCallback } from 'react'
import { ScrollView, Image, View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import { toggleFavorite } from '../store/actions/meals'

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <DefaultText>{props.children}</DefaultText>
    </View>
  )
}

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId')
  // useSeletorとconnect、どちらもReduxに接続している点はかわらないんだけど、記述コストがかるくって気軽に接続しちゃうね
  // とはいえ、DetailScreenはReduxに依存ではなくpropsでもらうほうがよい気もする
  const availableMeals = useSelector(state => state.meals.meals)
  const meal = availableMeals.find(meal => meal.id === mealId)

  const dispatch = useDispatch()
  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId))
  }, [dispatch, mealId])

  useEffect(() => {
    //componentからheaderにデータを渡す試み
    //これだとrender→setParamsになるので、初回renderにデータがないのであんまよくない
    props.navigation.setParams({ mealTitle: meal.title })
    // dispatchはいいのかね
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
  }, [toggleFavoriteHandler])

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.detail}>
        <DefaultText>{meal.duration}m</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Step</Text>
      {meal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  )
}

// DynamicSetiing
MealDetailScreen.navigationOptions = navigationData => {
  // useSelectorはfunctinalComponentの中でしか使えないから、ここでは使えない
  const mealTitle = navigationData.navigation.getParam('mealTitle')
  const toggleFavorite = navigationData.navigation.getParam('toggleFav')

  return {
    headerTitle: mealTitle,
    // ヘッダーのカスタマイズ
    // jsxを直接書くこともできるけど、プラットフォームごとの調整がかなりしんどい
    //headerRight: <Text>Fav </Text>,
    // react-navigation-header-buttonsのパッケージを使う
    // HeaderButtonsコンポーネントに、作ったHeaderComponentを渡すのがちょっと謎
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Favorite" iconName="ios-star" onPress={toggleFavorite} />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    // これないと表示されない
    height: 200,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
})

export default MealDetailScreen
