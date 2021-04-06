import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";

const Contact = ({ navigation }) => {
  const url = `https://www.odoocommunityonline.com/app-faq`;

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

Contact.navigationOptions = {
  headerShown: true,
  title: "Documentation",
  headerStyle: {
    backgroundColor: "#724e36",
  },
};

export default Contact;
