import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Input = ({ title, placeholder, keyboard, is_password, onChangeText }) => {
  const [text, setText] = useState("");
  const handleTextChange = (newText) => {
    setText(newText);
    if (onChangeText) {
      onChangeText(newText);
    }
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 16, color: "#03bafc" }}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textinput_style}
        keyboardType={keyboard}
        secureTextEntry={is_password}
        value={text} // Use the local state to set the input value
        onChangeText={handleTextChange}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  textinput_style: {
    borderBottomWidth: 1,
    borderBottomColor: "#03bafc",
    marginVertical: 10,
    paddingVertical: 0,
    marginTop: 5,
  },
});
