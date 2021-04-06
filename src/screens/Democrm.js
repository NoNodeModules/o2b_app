import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StatusBar, Platform } from "react-native";
import { WebView } from "react-native-webview";
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { Input, Button } from "react-native-elements";
import { Overlay } from "react-native-elements";
import { AsyncStorage } from 'react-native';

const Democrm = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    console.log("test%%%%%%%%2", values1);
    const values1 = navigation.getParam("values1", "default");
    const database = navigation.getParam("database", "default");

    const country_code = navigation.getParam("country_code", "default");
    const calling_code = navigation.getParam("calling_code", "default");
    const currency = navigation.getParam("currency", "default");
    const language = navigation.getParam("language", "default");
    const timezone = navigation.getParam("timezone", "default");



    console.log("test%%%%%%%%", values1);
    if (values1 == "default") {
      _logouttest();
    } else {
      console.log("test 1");
      let url = `https://www.o2btechnologies.com/crm/appdata?db=${database}&username=${values1.username}&email=${values1.email}&company=${values1.company}&phone=${values1.phone}&country_code=${country_code}&calling_code=${calling_code}&currency=${currency}&language=${language}&timezone=${timezone}`;
      console.log("url!!!!!!!!!!!",url);
      // alert("Kindly check your mail for the Requested Demo");
      // navigation.navigate("Login");
      setUrl(url);
      const timer = setTimeout(() => setVisible(false), 600);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  // _logouttest = async () => {
  //   await SecureStore.deleteItemAsync("sessionid");
  //   navigation.navigate("AuthLoading");
  // };

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS == "ios" ? (
        <View style={{ backgroundColor: "#724e36", height: 20 }}></View>
      ) : null}
      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>
<View style={{ marginTop: 0, marginHorizontal: 0 }}>
      <WebView
        source={{
          uri: url,
        }}
      />
            
      <Button
  title="Kindly check your mail and Login with the give credentials"
  onPress={() => navigation.navigate("Login")}
  buttonStyle={{ marginTop: 400 }}
/>
<TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "white",
                  padding: 20,
                  backgroundColor: "black",
                }}
              >
                Login to Demo account
              </Text>
      </TouchableOpacity>  
</View>
      <Overlay
        isVisible={visible}
        windowBackgroundColor="#724e36"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
      >
        <ActivityIndicator size="large" color="#808000" />
      </Overlay>
    </View>
  );
};

export default Democrm;
