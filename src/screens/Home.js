import React, { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator, StatusBar, Platform } from "react-native";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { Overlay } from "react-native-elements";
import { AsyncStorage, TouchableOpacity, Text, BackHandler, ImageBackground } from 'react-native';

const Home = ({ navigation }) => {
  // url : http://drwise.o2btechnologies.com/web/o2b?db=drwise&login=demo&password=demo
  const [url, setUrl] = useState("");
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const values = navigation.getParam("values", "default");
    const database = navigation.getParam("database", "default");
    if (values == "default") {
      _logout();
    } else {
      let url = `${values.url}/web/o2b?db=${database}&login=${values.username}&password=${values.password}`;
      setUrl(url);
      const timer = setTimeout(() => setVisible(false), 6000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  _logout = async () => {
    // await SecureStore.deleteItemAsync("sessionid");
    navigation.navigate("AuthLoading");
  };

const webviewRef = useRef(null)

  const backButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goBack()
}

const frontButtonHandler = () => {
  if (webviewRef.current) webviewRef.current.goForward()
}


// const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backButtonHandler
//     );


  const _onNavigationStateChange = async (webViewState) => {
    const values = navigation.getParam("values", "default");
    console.log("values@@@@@@@@@@@",values)
    const url = webViewState.url.split('/web');
    console.log("url@@@@@@@@@@@@@",url[0])
    console.log("webViewState.url@@@@@@@@@",webViewState.url);
    if (webViewState.url == `${values.url}/web/login`) {
      //await SecureStore.deleteItemAsync("sessionid")
      console.log("webViewState.url@@@@@@@@@",webViewState.url);
      navigation.navigate("AuthLoading");
      let keys = ['data','url', 'username', 'password'];
      AsyncStorage.multiRemove(keys, (err) => {
        console.log("keys@@@@@@@@",keys);
      });
    }

    console.log(webViewState.url);
  };

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS == "ios" ? (
        <View style={{ backgroundColor: "#724e36", height: 40 }}></View>
      ) : null}
      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>

      <WebView
        source={{
          uri: url,
        }}
        onNavigationStateChange={_onNavigationStateChange}
        ref={webviewRef}
        javaScriptEnabled={true}
        // onNavigationStateChange={navState => {
        //   setCanGoBack(navState.canGoBack)
        //   setCanGoForward(navState.canGoForward)
        //   setCurrentUrl(navState.url)
        // }}

        onMessage={message => {
          console.log("message@@@@@@@@@@@@@@@@@",message);
        }}
        injectedJavaScript="window.postMessage(document)"
      />
      <Overlay
        isVisible={visible}
        windowBackgroundColor="#724e36"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
      >
        <ActivityIndicator size="large" color="#724e36" />
      </Overlay>
      <ImageBackground source={require("../../assets/pexels-photo.jpeg")}
                style={{ height: 55}}>
          <View style={{
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
            }}>
    

      <TouchableOpacity onPress={backButtonHandler}>
        <Text style={{
                  color: 'white',
                  fontSize: 14
                }}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={frontButtonHandler}>
        <Text style={{
          color: 'white',
          fontSize: 14
        }}>Forward</Text>
      </TouchableOpacity>
     
    </View>
     </ImageBackground>
    </View>
  );
};



export default Home;
