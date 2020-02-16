import { ADD_TO_CART } from '../actions/cart'
import CartItem from '../../models/cart-item'

const initialState = {
  // relationをもたせるっぽいのでオブジェクト
  items: {},
  totalAmount: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.product
      const { title, price, id } = addedProduct

      let updatedOrNewCartItem

      if (state.items[id]) {
        // you already have the item in the cart
        // TODO CartItemにメソッドを持たす案はどうなのか気になるので、別でやろ
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        )
      } else {
        // リストの中身をクラスで表現するって素敵な気がしてきた
        // initalStateのitemsをみても、itemsの中にどんなプロパティがあるのがわかんないから
        // クラスで書かれてると、itemの中身も理解しやすい
        // とはいえ型が書ければこの問題もおこんないんだけどね、、、
        updatedOrNewCartItem = new CartItem(1, price, title, price)
      }
      return {
        ...state,
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price,
      }
    }
    default:
      return state
  }
}
