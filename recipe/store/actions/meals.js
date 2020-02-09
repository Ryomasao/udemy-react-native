export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'

export const toggleFavorite = mealId => ({
  type: TOGGLE_FAVORITE,
  payload: {
    mealId: mealId,
  },
})
