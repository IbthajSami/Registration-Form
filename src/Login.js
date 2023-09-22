import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Input from "./Input";
import axios from "axios";
const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("username", username);
    console.log("password", password);
    axios
      .post(
        "http://192.168.0.109:3000/api/login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + yourBearerToken,
          },
        }
      )
      .then((res) => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        console.log("Authentication error:", err);
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
        <Text
          style={{
            fontSize: 19,
            fontWeight: "bold",
            color: "#03bafc",
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <Input
          title={"Username"}
          placeholder={"Username"}
          keyboard={"default"}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          title={"Password"}
          placeholder={"********"}
          keyboard={"default"}
          is_password={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity>
          <Text style={{ color: "#03bafc", textAlign: "right", fontSize: 16 }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

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
          onPress={() => {
            handleLogin();
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 19,
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "#03bafc",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          Dont have an account?
          <Text onPress={() => navigation.navigate("Signup")}>Signup</Text>
        </Text>
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
    margin: 10,
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});
export default Login;
