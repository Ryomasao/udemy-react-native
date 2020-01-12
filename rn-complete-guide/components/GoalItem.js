import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const GoalItem = ({ value, index, deleteHandler }) => {
  return (
    <View style={styles.listItem}>
      <Text>{value}</Text>
      <Button title="×" onPress={() => deleteHandler(index)} />
    </View>
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
