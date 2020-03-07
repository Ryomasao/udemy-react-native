import React from 'react'
import { FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'
import * as productActions from '../../store/actions/product'

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.product.userProducts)

  const dispatch = useDispatch()
  const handleEdit = id => {
    props.navigation.navigate('EditProduct', { productId: id })
  }
  const handleDelete = id => {
    dispatch(productActions.deleteProduct(id))
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => handleEdit(item.id)}>
          <Button
            title="Edit"
            colors={Colors.primary}
            onPress={() => handleEdit(item.id)}
          />
          <Button
            title="Delete"
            colors={Colors.primary}
            onPress={() => handleDelete(item.id)}
          />
        </ProductItem>
      )}
    />
  )
}

UserProductScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'User Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer()
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-create"
          onPress={() => {
            navigation.navigate('EditProduct')
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default UserProductScreen
