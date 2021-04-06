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

const Urlscanner = ({ navigation }) => {
  const [values1, setValues] = useState({
    //url: "https://drwise.o2btechnologies.com",
    //username: "Urlscanner",
    //password: "Urlscanner",
    url: "",
      });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
        console.log("dbvalue@@@@@@@@@@@@@2",dbvalue);
        if(values1.url){
        navigation.navigate("Scanner", { values1, database: dbvalue });
      }
      else{
        setIsLoading(false);
        alert("Please write details in correct format!");
      }
      })
      .catch((e) => {
        console.log("wrong45",e);
        setIsLoading(false);
        setError("sorry something went wrong...!");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 30,
                  color: "black",
                }}
              >
                Request Urlscanner
              </Text>
          <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 30 }}>
              <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>

              <Input
                placeholder="Url"
                leftIcon={
                  <FontAwesome5Icon
                    style={styles.icon}
                    name="paper-plane"
                    size={24}
                    color="black"
                  />
                }
                value={values1.url}
                errorMessage=""
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                  paddingRight: 10,
                }}
                onChangeText={(url) => setValues({ ...values1, url })}
              />
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 40 }}>
              <Button
                raised
                loading={isLoading}
                title="Urlscanner"
                onPress={fetchDbN}
                buttonStyle={{ backgroundColor: "black" }}
              />
            </View>
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
    backgroundColor: "rgba(119, 134, 148, 1)",
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Urlscanner;
