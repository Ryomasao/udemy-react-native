import React from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = ({ value, changeHandler, addHandler, visible, onCancel }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Course Goal"
          style={styles.input}
          value={value}
          onChangeText={changeHandler}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="CANCEL" onPress={onCancel} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="ADD" onPress={addHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    width: "40%",
    borderWidth: 1
  }
});

export default GoalInput;
