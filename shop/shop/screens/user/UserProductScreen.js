import React from 'react'
import { FlatList, Button } from 'react-native'
import { useSelector } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import ProductItem from '../../components/shop/ProductItem'

const UserProductScreen = props => {
  const userProducts = useSelector(state => state.product.userProducts)

  const handleEdit = () => {}
  const handleDelete = () => {}

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem item={item} onSelect={() => {}}>
          <Button
            title="Edit"
            colors={Colors.primary}
            onPress={() => handleEdit()}
          />
          <Button
            title="Delete"
            colors={Colors.primary}
            onPress={() => handleDelete()}
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
  }
}

export default UserProductScreen
