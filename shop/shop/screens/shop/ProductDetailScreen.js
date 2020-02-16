import React from 'react'
import { View, Text, Image, Button, ScrollView, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductsDetailScreen = props => {
  const { id } = props.navigation.state.params
  const selectedProduct = useSelector(state =>
    state.product.availableProducts.find(p => p.id === id)
  )

  const { price, description, imageUrl } = selectedProduct

  const dispatch = useDispatch()
  const handleOnPress = () => {
    dispatch(cartActions.addToCart(selectedProduct))
  }

  return (
    <ScrollView>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Card"
          onPress={handleOnPress}
        />
      </View>
      <Text style={styles.price}>${price.toFixed(2)}$</Text>
      <Text style={styles.description}>{description}</Text>
    </ScrollView>
  )
}

ProductsDetailScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title')
  return {
    title,
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'open-sans-bold',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
})
export default ProductsDetailScreen
