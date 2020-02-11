import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useDispatch } from 'react-redux'

import HeaderButton from '../components/HeaderButton'
import Colors from '../constants/Color'
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        value={props.state}
        onValueChange={newValue => props.onChange(newValue)}
        trackColor={{ true: Colors.primaryColor }}
        //thumbColor={Colors.primaryColor}
      />
    </View>
  )
}

const FilterScreen = props => {
  const { navigation } = props

  const [isGlutenFree, setIsGlutenFree] = useState(false)
  const [isLactoseFree, setIsLactoseFree] = useState(false)
  const [isVegan, setIsVegan] = useState(false)
  const [isVegetarian, setIsVegetarian] = useState(false)

  const dispatch = useDispatch()

  // saveFilters関数はrenderingの度に作成されてしまう
  // useCallbackを使うことで、[]に指定した値が変わらない限り、関数は生成されない
  const saveFilters = useCallback(() => {
    const appliedFiters = {
      gulutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetraian: isVegetarian,
    }

    dispatch(setFilters(appliedFiters))
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch])

  // そしてuseEffectも同じで、saveFilter関数がかわったタイミングでのみ実行する
  useEffect(() => {
    navigation.setParams({ save: saveFilters })
  }, [saveFilters])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available / Restrictions</Text>
      <FilterSwitch
        label="guluten-free"
        state={isGlutenFree}
        onChange={setIsGlutenFree}
      />
      <FilterSwitch
        label="lactose-free"
        state={isLactoseFree}
        onChange={setIsLactoseFree}
      />
      <FilterSwitch label="vegan" state={isVegan} onChange={setIsVegan} />
      <FilterSwitch
        label="vegetarian"
        state={isVegetarian}
        onChange={setIsVegetarian}
      />
    </View>
  )
}

FilterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Filters',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            // ちょっとトリッキーな、Navigationからコンポーネントのデータをみるやり方
            // コンポーネント側でstateを参照する関数を用意して、navigationに渡してる
            // それをここで実行する
            // 普通はReduxでみるんだけど、こういう用途はあるのかな？
            onPress={navData.navigation.getParam('save')}
          />
        </HeaderButtons>
      )
    },
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15,
  },
})

export default FilterScreen
