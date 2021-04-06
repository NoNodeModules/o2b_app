import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import { Input, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";

const Signup = ({ navigation }) => {
  const [values1, setValues] = useState({
    //url: "https://drwise.o2btechnologies.com",
    //username: "demo",
    //password: "demo",
    url: "https://odoocommunityonline.com",
    email: "",
    username: "",
    password: "",
    confirm: "",

  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  const fetchDbN = () => {
    //https://drwise.o2btechnologies.com/o2b/database?pass=supervisor351
    setIsLoading(true);

    axios
      .get(`${values1.url}/o2b/database`, {
        params: {
          pass: "supervisor351",
        },
      })
      .then((response) => {
        let data = response.data;
        console.log("data",data.database[0]);
        const dbvalue = data.database[0];
        const mail = values1.email
        if (mail.match(pattern) === null){
          alert("please write the correct mail!");
          setIsLoading(false);
        }
        if (values1.password != values1.confirm){
           alert("Password didn't Match");
           setIsLoading(false);
        }
        if(values1.url && values1.username && values1.password && values1.confirm && values1.password === values1.confirm && mail.match(pattern) != null){
        navigation.navigate("Pricing", { values1, database: dbvalue });
      }
      // else{
      //   setIsLoading(false);
      //   alert("Please write details in correct format!");
      // }
      })
      .catch((e) => {
        console.log("wrong45");
        setIsLoading(false);
        setError("sorry something went wrong...!");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
                height: 200,
              }}
            >
              <Image
                source={require("../../assets/logo_black.png")}
                style={{ height: 240, width: 240 }}
              />
            </View>
          </View>
          <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 30,
                  color: "black",
                }}
              >
                Sign Up
              </Text>
          <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 30 }}>
              <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>

              <Input
                placeholder="Email"
                leftIcon={
                  <FontAwesome5Icon
                    style={styles.icon}
                    name="paper-plane"
                    size={24}
                    color="black"
                  />
                }
                value={values1.email}
                errorMessage=""
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                  paddingRight: 10,
                }}
                onChangeText={(email) => setValues({ ...values1, email })}
              />

              <Input
                placeholder="Username"
                leftIcon={
                  <FontAwesome5Icon
                    style={styles.icon}
                    name="user"
                    size={24}
                    color="black"
                  />
                }
                value={values1.username}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(username) => setValues({ ...values1, username })}
              />
              <Input
                secureTextEntry={true}
                leftIcon={
                  <FontAwesome5Icon
                    name="fingerprint"
                    style={styles.icon}
                    size={24}
                    color="black"
                  />
                }
                value={values1.password}
                placeholder="Password"
                inputStyle={{
                  color: "black",
                }}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(password) => setValues({ ...values1, password })}
              />
              <Input
                secureTextEntry={true}
                leftIcon={
                  <FontAwesome5Icon
                    name="fingerprint"
                    style={styles.icon}
                    size={24}
                    color="black"
                  />
                }
                value={values1.confirm}
                placeholder="Confirm Password"
                inputStyle={{
                  color: "black",
                }}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(confirm) => setValues({ ...values1, confirm })}
              />
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 40 }}>
              <Button
                raised
                loading={isLoading}
                title="SIGNUP"
                onPress={fetchDbN}
                buttonStyle={{ backgroundColor: "black" }}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "white",
                }}
              >
                Already Have an account?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#724e36",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Signup;
