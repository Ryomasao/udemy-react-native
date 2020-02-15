import React from 'react'
import {
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Colros from '../constants/Colors'

const ProductItem = ({ item, onSelect }) => {
  const { id, title, price, imageUrl } = item
  return (
    <TouchableOpacity onPress={() => onSelect({ id, title })}>
      <View style={styles.product}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            color={Colros.primary}
            title="View Detail"
            onPress={() => onSelect({ id, title })}
          />
          <Button color={Colros.primary} title="to Card" onPress={() => {}} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    backgroundColor: 'white',
    borderRadius: 10,

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
    height: '15%',
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
    height: '25%',
    paddingHorizontal: 20,
  },
})

export default ProductItem
