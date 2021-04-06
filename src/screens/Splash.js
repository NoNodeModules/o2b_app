import React, { useEffect } from "react";
import { View, Image, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";

const Splash = ({ navigation }) => {
  const image = "../../assets/logo_white.png";

  useEffect(() => {
    const timer = setTimeout(() => {
      _bootstrapAsync();
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const _bootstrapAsync = async () => {
    const userToken = await SecureStore.getItemAsync("sessionid");
    navigation.navigate(userToken ? "App" : "Auth");
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#724e36",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={require(image)} style={{ height: 240, width: 340 }} />
      <ActivityIndicator color="white" size="large" style={{ marginTop: 10 }} />
    </View>
  );
};

export default Splash;
