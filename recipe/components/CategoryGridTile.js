import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const CategoryGridTile = ({ category, onPress }) => {
  // Note
  // Androidでボタンをタッチした際に不要なBorderが出たりする問題は、121のコースをみよう
  // 今回は対応しない
  return (
    <TouchableOpacity onPress={onPress} style={styles.gridItem}>
      <View style={{ ...styles.container, backgroundColor: category.color }}>
        <Text style={styles.title} numberOfLines={2}>
          {category.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    //for android
    elevation: 3,

    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
  },
})

export default CategoryGridTile
