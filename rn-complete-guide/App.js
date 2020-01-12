import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import GoalInput from "./components/GoalInput";
import GoalItem from "./components/GoalItem";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [courseGoals, setCourseGoal] = useState([]);

  const goalInputHandler = enteredGoal => {
    // Webだとイベントが実行する関数の引数はeventオブジェクトだけど
    // ここでは、入力文字列そのものだった

    // console.log()も使える。すごい。ターミナル or expoのdevtoolに表示される
    // console.log(enteredGoal)
    setEnteredGoal(enteredGoal);
  };

  const addGoalHandelr = () => {
    // FlatListではオブジェクトにkeyが必要。key名は、デフォルトでkey or idとなる。
    // これを変更する場合は、FlatListのプロパティExtractedKeyでkey名を指定する。
    setCourseGoal(currentGoals => [
      ...currentGoals,
      { key: Math.random().toString(), value: enteredGoal }
    ]);
    setEnteredGoal("");
  };

  const deleteGoalHandler = id => {
    const newGoals = courseGoals.filter(item => item.key !== id);
    setCourseGoal(newGoals);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <GoalInput
          value={enteredGoal}
          changeHandler={goalInputHandler}
          addHandler={addGoalHandelr}
        />
      </View>
      <FlatList
        data={courseGoals}
        renderItem={({ item }) => (
          <GoalItem
            value={item.value}
            id={item.key}
            onDelete={deleteGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
