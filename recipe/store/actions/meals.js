export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const SET_FILTERS = 'SET_FILTERS'

export const toggleFavorite = mealId => ({
  type: TOGGLE_FAVORITE,
  payload: {
    mealId: mealId,
  },
})

export const setFilters = filterSetting => ({
  type: SET_FILTERS,
  payload: {
    filters: filterSetting,
  },
})
