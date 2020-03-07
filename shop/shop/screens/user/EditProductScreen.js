import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import Colors from '../../constants/Colors'
import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/product'

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state =>
    state.product.userProducts.find(prod => prod.id === productId)
  )

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
  const [imageUrl, setImageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ''
  )
  const [price, setPrice] = useState(editedProduct ? editedProduct.price : '')
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ''
  )

  const dispatch = useDispatch()

  // フォームは、キー入力の度にrerenderが起きて、この関数も生成されちゃういから積極的にuseCallbackを使っていきたい
  // が、しかし最新のステートをみたいので、結局dependenciesにステートの値をいれなきゃいけないのだった
  // ここまで列挙すると、useCallback使わなくてもいいんじゃねえかなって気もする
  const handleSubmit = useCallback(() => {
    if (editedProduct) {
      dispatch(
        productActions.updateProduct(productId, title, imageUrl, description)
      )
    } else {
      dispatch(
        productActions.createProduct(title, imageUrl, description, +price)
      )
    }
    props.navigation.goBack()
  }, [dispatch, title, imageUrl, price, description])

  // ヘッダーでdispatchしたい場合の手段
  // 本来であれば、親コンポーネントからHeaderに渡したいところだけど、Screenだから
  useEffect(() => {
    props.navigation.setParams({ submit: handleSubmit })
  }, [handleSubmit])

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>ImageUrl</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Descripition</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>
      </View>
    </ScrollView>
  )
}

EditProductScreen.navigationOptions = ({ navigation }) => {
  const id = navigation.getParam('productId')
  const submitFn = navigation.getParam('submit')

  return {
    headerTitle: id ? 'Edit Product' : 'Add Product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName="ios-checkmark"
          onPress={() => {
            submitFn()
          }}
        />
      </HeaderButtons>
    ),
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 9,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})

export default EditProductScreen
