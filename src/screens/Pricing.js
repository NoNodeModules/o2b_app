import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StatusBar, Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { Overlay } from "react-native-elements";
import { AsyncStorage } from 'react-native';

const Pricing = ({ navigation }) => {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const values1 = navigation.getParam("values1", "default");
    const database = navigation.getParam("database", "default");
    if (values1 == "default") {
      _logout();
    } else {
      console.log("test 1");
      let url = `${values1.url}/shop/checkout1?db=${database}&username=${values1.username}&email=${values1.email}&password=${values1.password}`;
      console.log("url!!!!!!!!!!!",url);
      setUrl(url);
      const timer = setTimeout(() => setVisible(false), 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  _logout = async () => {
    await SecureStore.deleteItemAsync("sessionid");
    navigation.navigate("AuthLoading");
  };

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS == "ios" ? (
        <View style={{ backgroundColor: "#808000", height: 20 }}></View>
      ) : null}
      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>

      <WebView
        source={{
          uri: url,
        }}
      />
      <Overlay
        isVisible={visible}
        windowBackgroundColor="rgba(255, 255, 255, .5)"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
      >
        <ActivityIndicator size="large" color="#808000" />
      </Overlay>
    </View>
  );
};

export default Pricing;
