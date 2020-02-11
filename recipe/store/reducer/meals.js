import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals'

const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
}

const mealsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      const exsistingIndex = state.favoriteMeals.findIndex(
        meal => meal.id === action.payload.mealId
      )

      if (exsistingIndex >= 0) {
        const updateFavMeals = [...state.favoriteMeals]
        // spliceはもとの配列を変更する
        updateFavMeals.splice(exsistingIndex, 1)
        return { ...state, favoriteMeals: updateFavMeals }
      } else {
        const meal = state.meals.find(meal => meal.id === action.payload.mealId)
        // concatは新しい配列を返す。
        return { ...state, favoriteMeals: state.favoriteMeals.concat(meal) }
      }
    case SET_FILTERS:
      const appliedFilters = action.payload.filters
      const updateFilteredMeals = state.meals.filter(meal => {
        if (appliedFilters.glutenFree && !meal.isGlutenFree) {
          return false
        }
        if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
          return false
        }
        if (appliedFilters.vegan && !meal.isVegan) {
          return false
        }
        if (appliedFilters.vegetraian && !meal.isVegetarian) {
          return false
        }
        return true
      })
      return { ...state, filteredMeals: updateFilteredMeals }
    default:
      return state
  }
}

export default mealsReducer
