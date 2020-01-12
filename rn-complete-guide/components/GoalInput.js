import React from "react";
import { TextInput, Button, StyleSheet } from "react-native";

const GoalInput = ({ value, changeHandler, addHandler }) => {
  return (
    <React.Fragment>
      <TextInput
        placeholder="Course Goal"
        style={styles.input}
        value={value}
        onChangeText={changeHandler}
      />
      <Button title="ADD" onPress={addHandler} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10
  }
});

export default GoalInput;
