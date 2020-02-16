Udemy の ReactNative 学習用リポジトリ

# プロジェクトの作り方

https://facebook.github.io/react-native/docs/getting-started

```
$ expo init <Project-Name>
```

## 全体を通してのメモ

### ReactNativeDebugger
react + redux devtoolがReactNativeでも使える。強い。
アプリを起動して、command + T でポート検索してシミュレーターとつなげる。
シミュレーター側もRemoteDebugginをONにする。
Reduxの以下の設定も忘れないようにする。

```js
import { composeWithDevTools } from 'redux-devtools-extension'
const store = createStore(combineReducers(rootReducer), composeWithDevTools()
```
