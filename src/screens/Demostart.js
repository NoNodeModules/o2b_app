import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";

const Demostart = ({ navigation }) => {
  const url = `https://oca.odoocommunityonline.com/web/o2b?db=oca&login=demo&password=demo`;

    _logout = async () => {
    await SecureStore.deleteItemAsync("sessionid");
    navigation.navigate("AuthLoading");
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: url,
        }}
      />
    </View>
  );
};

Demostart.navigationOptions = {
  headerShown: true,
  title: "Requested Demo",
  headerStyle: {
    backgroundColor: "#724e36",
  },
};

export default Demostart;
