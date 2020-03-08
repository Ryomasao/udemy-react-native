import React, { useCallback, useEffect, useReducer } from 'react'
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import * as productActions from '../../store/actions/product'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = { ...state.inputValues, [action.input]: action.value }

    const updatedValidties = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    }

    let updatedFormIsValid = true
    // 地味にこういうのすごいなって思ったんだ
    for (const key in updatedValidties) {
      updatedFormIsValid = updatedFormIsValid && updatedValidties[key]
    }

    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidties,
      formIsValid: updatedFormIsValid,
    }
  }

  return state
}

const EditProductScreen = props => {
  const productId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state =>
    state.product.userProducts.find(prod => prod.id === productId)
  )

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  })

  const textChangeHandler = (inputIdentfier, text) => {
    let isValid = false
    if (text.trim().length > 0) {
      isValid = true
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentfier,
    })
  }

  const dispatch = useDispatch()

  // フォームは、キー入力の度にrerenderが起きて、この関数も生成されちゃういから積極的にuseCallbackを使っていきたい
  // が、しかし最新のステートをみたいので、結局dependenciesにステートの値をいれなきゃいけないのだった
  // ここまで列挙すると、useCallback使わなくてもいいんじゃねえかなって気もする
  const handleSubmit = useCallback(() => {
    const { title, imageUrl, description, price } = formState.inputValues

    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        {
          text: 'Okay',
        },
      ])
      return
    }

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
  }, [dispatch, formState])

  // ヘッダーでdispatchしたい場合の手段
  // 本来であれば、親コンポーネントからHeaderに渡したいところだけど、Screenだから
  useEffect(() => {
    props.navigation.setParams({ submit: handleSubmit })
  }, [handleSubmit])

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          label="Title"
          value={formState.inputValues.title}
          isValid={formState.inputValidities.title}
          onChangeText={text => textChangeHandler('title', text)}
          errorText="please enter a valid title"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
        />
        <Input
          label="Image Url"
          value={formState.inputValues.imageUrl}
          isValid={formState.inputValidities.imageUrl}
          onChangeText={text => textChangeHandler('imageUrl', text)}
          errorText="please enter a valid imageUrl"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
        />
        {editedProduct ? null : (
          <Input
            label="Price"
            value={formState.inputValues.price}
            onChangeText={text => textChangeHandler('price', text)}
            isValid={formState.inputValidities.price}
            errorText="please enter a valid price"
            keyboardType="decimal-pad"
            returnKeyType="next"
          />
        )}
        <Input
          label="Description"
          value={formState.inputValues.description}
          onChangeText={text => textChangeHandler('description', text)}
          isValid={formState.inputValidities.description}
          errorText="please enter a valid description"
          autoCapitalize="sentences"
          autoCorrect
          multiline
          numberOfLines={3}
        />
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
})

export default EditProductScreen
