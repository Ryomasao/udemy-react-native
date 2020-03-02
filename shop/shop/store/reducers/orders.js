import { ADD_ORDER } from '../actions/orders'
import Order from '../../models/order'

const dummy1 = new Order('101', {}, 999, new Date())
const dummy2 = new Order('102', {}, 888, new Date())

//const dummy2 = {
//  date: new Date(),
//  id: '2',
//  items: [
//    {
//      id: 'p1',
//      productPrice: 29.99,
//      productTitle: 'Red Shirt',
//      quantity: 2,
//      sum: 59.98,
//    },
//  ],
//  totalAmount: 59.98,
//}

const initialState = {
  //orders: [dummy1, dummy2],
  orders: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const { items, amount } = action.orderData
      const newOrder = new Order(
        new Date().toString(),
        items,
        amount,
        new Date()
      )
      return { ...state, orders: [...state.orders, newOrder] }
    }
    default:
      return state
  }
}
