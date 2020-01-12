import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const [enterdGoal, setEnteredGoal] = useState("");
  const [couseGoals, setCourseGoal] = useState([]);

  const goalInputHandler = enterdGoal => {
    // Webだとイベントが実行する関数の引数はeventオブジェクトだけど
    // ここでは、入力文字列そのものだった

    // console.log()も使える。すごい。ターミナル or expoのdevtoolに表示される
    // console.log(enterdGoal)
    setEnteredGoal(enterdGoal);
  };

  const addGoalHandelr = () => {
    setCourseGoal(currentGoals => [...currentGoals, enterdGoal]);
    setEnteredGoal("");
  };

  const deleteGoalHandler = deleteTargetIndex => {
    const newGoals = couseGoals.filter(
      (_, index) => index !== deleteTargetIndex
    );
    setCourseGoal(newGoals);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          value={enterdGoal}
          onChangeText={goalInputHandler}
        />
        <Button title="ADD" onPress={addGoalHandelr} />
      </View>
      <View>
        {couseGoals.map((goal, index) => (
          <View key={index} style={styles.listItem}>
            <Text>{goal}</Text>
            <Button title="×" onPress={() => deleteGoalHandler(index)} />
          </View>
        ))}
      </View>
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
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10
  },
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
