class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id
    this.items = items
    this.totalAmount = totalAmount
    this.date = date
  }

  // 感動ポイント
  // Model層を用意するってこういうことなのかな
  // stateにplainオブジェクトではなく、インスタンスをもたせる
  // こうすることで、モデルのデータを触るときに、そのモデルのデータをさわる箇所が明確になるし
  // 画面側で使いたい値にここで加工することもできる
  // Vuexとかであれば、getetrsがそれに該当するからいらないのか？どうなんだろう。
  // 一方、インスタンスになると、UI系コンポーネント側から使いにくくなる。
  // インスタンスそのものをpropsにわたすような仕組みだとよくなさそう。
  // なのでScreen側から必要なpropsを全部plainな形で渡したりするのかな。
  // OrderScreenの実装をみてみて
  // いや、型があれば大丈夫なのかな
  //
  get readbleDate() {
    // AndroidだとLocaleDate機能しないとのこと。momentつかうといいね。
    return this.date.toLocaleDateString('en-EN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
}

export default Order
