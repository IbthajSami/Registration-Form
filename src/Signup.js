import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Input from "./Input";
import axios from "axios";
const Signup = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");

  const handleSignup = () => {
    console.log("username", username);
    console.log("email", email);
    console.log("pass", pass);
    console.log("cpass", cpass);
    axios
      .post("http://192.168.0.109:3000/api/data", {
        Username: username,
        emailAddress: email,
        password: pass,
        cpassword: cpass,
      })
      .then((res) => {
        console.log("res", res);
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <SafeAreaView>
      <LinearGradient
        colors={["#42a1f5", "#03bafc", "#42cf5f"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient_style}
      >
        <Text style={{ color: "#fff", fontSize: 31, fontWeight: "bold" }}>
          R.T. Guide
        </Text>
      </LinearGradient>

      <View style={styles.Login_style}>
        <KeyboardAvoidingView behavior="height">
          <Text
            style={{
              fontSize: 19,
              fontWeight: "bold",
              color: "#03bafc",
              textAlign: "center",
            }}
          >
            Register
          </Text>

          <Input
            title={"Username"}
            placeholder={"Username"}
            keyboard={"default"}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Input
            title={"Email"}
            placeholder={"register@gmail.com"}
            keyboard={"email-address"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            title={"Password"}
            placeholder={"********"}
            keyboard={"default"}
            is_password={true}
            value={pass}
            onChangeText={(text) => setPass(text)}
          />
          <Input
            title={"Confirm Password"}
            placeholder={"********"}
            keyboard={"default"}
            is_password={true}
            value={cpass}
            onChangeText={(text) => setCpass(text)}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#03bafc",
              borderRadius: 100,
              width: 150,
              alignSelf: "center",
              alignItems: "center",
              paddingVertical: 5,
              marginTop: 25,
              marginBottom: 10,
            }}
            onPress={() => handleSignup()}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 19,
              }}
            >
              SIGNUP
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "#03bafc",
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Already have an account?
            <Text onPress={() => navigation.navigate("Login")}> Login</Text>
          </Text>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradient_style: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: Dimensions.get("window").height * 0.2,
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
  Login_style: {
    elevation: 10,
    borderColor: "white",
    borderRadius: 10,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
export default Signup;
