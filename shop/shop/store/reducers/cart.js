import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { DELETE_PRODUCT } from '../actions/product'
import { ADD_ORDER } from '../actions/orders'
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
    case REMOVE_FROM_CART: {
      const { id } = action
      const selectedCartItem = state.items[id]
      let updatedCartItems

      if (selectedCartItem.quantity > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        )
        updatedCartItems = { ...state.items, [id]: updatedCartItem }
      } else {
        updatedCartItems = { ...state.items }
        delete updatedCartItems[id]
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      }
    }
    // このアクションはorderアクションのもの
    // ReduxってcombineReducerするとなんとなく、reducerごとにアクション区切られるような気がしたけど
    // 全くそんなことはなかった
    // なので、別のreducerのアクションも普通に飛んでくる
    case ADD_ORDER: {
      return initialState
    }
    case DELETE_PRODUCT: {
      const { id } = action
      if (!state.items[id]) {
        return state
      }

      const updatedItems = { ...state.item }
      const itemTotal = state.items[id].sum
      delete updatedItems[id]

      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal,
      }
    }
    default:
      return state
  }
}
