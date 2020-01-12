import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// onPress={() => onDelete(id)}
// イベントハンドラに引数を渡したい場合にthunkさせるしかないと思ってた。
// 以下のようにbindを使うことで、関数の引数を変更することができる。
// onPress={onDelete.bind(this, id)}
// これは、onDeleteを実行するときのthisの指定と、引数を指定している

// ちなみにthisは関数内でもグローバルのthisを指してる

const GoalItem = ({ value, id, onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete.bind(this, id)}>
      <View style={styles.listItem}>
        <Text>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    // margin: 10 0　と同じ。わかりやすいね。
    marginVertical: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default GoalItem;
