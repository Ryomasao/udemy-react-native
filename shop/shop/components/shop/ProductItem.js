import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'

import Card from '../UI/Card'

const ProductItem = ({ item, onSelect, children }) => {
  const { id, title, price, imageUrl } = item
  return (
    <Card style={styles.product}>
      <TouchableOpacity onPress={() => onSelect({ id, title })}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>{children}</View>
      </TouchableOpacity>
    </Card>
  )
}

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20,
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    // これがないと画像をラップしてるproductのradiusが隠れちゃうっぽい
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    fontFamily: 'open-sans',
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
})

export default ProductItem
