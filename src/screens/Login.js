import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import { Input, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";
import { AsyncStorage } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Overlay } from "react-native-elements";
import Odoo from 'react-native-odoo-promise-based'

const Login = ({ navigation }) => {
  const [values, setValues] = useState({
    //url: "https://drwise.o2btechnologies.com",
    //username: "demo",
    //password: "demo",
    url: "",
    username: "",
    password: "",
  });
  // AsyncStorage.getItem('username').then((value) => this.setState({ 'username': values.username }))
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
 
 const _retrieveData = async () => {
  try {
      AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {

          if(store[i][0] === "data"){
            data = store[i][1];
            navigation.navigate("Scanner")
          }
          
          // get at each store's key/value so you can work with it
          if(store[i][0] === "url"){
            values.url = store[i][1];
            fetchDbName(values.url);
          }
          if(store[i][0] === "username"){
            values.username = store[i][1];
          }
          if(store[i][0] === "password"){
            values.password = store[i][1];
          }      
          });
        });
      });
    }
  catch (error) {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {

          if(store[i][0] === "data"){
            data = store[i][1];
          }

          // get at each store's key/value so you can work with it
          if(store[i][0] === "url"){
            values.url = store[i][1];

          }
          if(store[i][0] === "username"){
            values.username = store[i][1];
          }
          if(store[i][0] === "password"){
            values.password = store[i][1];
          }      
          });
        });
      });
    // Error retrieving data
  }
};


  const fetchDbName = (urlvalue) => {
    console.log("urlvalue@@@@@@@@@@");
    axios
      .get(`${values.url}/o2b/database`, {
        params: {
          pass: "supervisor351",
        },
      })
      .then((response) => {
      let data = response.data;
      console.log("database!!!!!!!!",data.database[0]);
      const dbvalue = data.database[0];
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Kindly purchase subscription from https://www.odoocommunityonline.com !")
      });


    setIsLoading(true);
    var ul = `${values.url}/get/expire_values`
    axios
      .get(`${values.url}/get/expire_values`)
      .then((response) => {
        console.log("response.data@@@@@@@@@@",response.data)
      if (response.data.diffdays){
        console.log("test111111112345666767676",response.data.subscription);
        if (response.data.subscription){
          AsyncStorage.setItem('subscription', response.data.subscription);
        }
        if (response.data.base_domain){
          AsyncStorage.setItem('base_domain', response.data.base_domain);
        }

        const subscribe = response.data.subscription
        const max_user = response.data.max_user

      const url = `${response.data.base_domain}/o2b/subscription_date`;
      console.log("response.data.subscription@@@@@@@@@@@@@",response.data.dbuuid);
      console.log("max_user@@@@@@@@@@@@@@",max_user);
      axios
      .post(url,
        {
        params: {
          subscription_id :response.data.subscription,
          dbuuid: response.data.dbuuid,
        },
        })
        .then((response) => {
          var result = response.data.result
          console.log("result@@@@@@@@@@@@@@@",result)
          const js = JSON.parse(result)
          var date = new Date()
          const exp_date = new Date(js.expiry_date)
          console.log("js.subs_id@@@@@@@@@",js);
          if (js.subs_id == subscribe && max_user <= js.max_users  && date <= exp_date){
            if (urlvalue){
    axios
      .get(`${urlvalue}/o2b/database`, {
        params: {
          pass: "supervisor351",
        },
      })
      .then((response) => {
      if (values.username && values.url && values.password) {
      console.log("test1111111");
      //To check the input not empty
      AsyncStorage.setItem('url', values.url);
      AsyncStorage.setItem('username', values.username);
      AsyncStorage.setItem('password', values.password);      
      }
        let data = response.data;
        console.log("database!!!!!!!!",data.database[0]);
        const dbvalue = data.database[0];

        handleLogin(dbvalue);
      })
      .catch((e) => {
        if (values.username && values.url && values.password) {
      console.log("test222222",e);
      //To check the input not empty
      AsyncStorage.setItem('url', values.url);
      AsyncStorage.setItem('username', values.username);
      AsyncStorage.setItem('password', values.password);      
    }
        setIsLoading(false);
      axios
      .get(`${values.url}/o2b/database`, {
        params: {
          pass: "supervisor351",
        },
      })
      .then((response) => {
         if (values.username && values.url && values.password) {
      console.log("test333333");
      //To check the input not empty
      AsyncStorage.setItem('url', values.url);
      AsyncStorage.setItem('username', values.username);
      AsyncStorage.setItem('password', values.password);      
    }
        let data = response.data;
        const dbvalue = data.database[0];
        console.log("log@@@@@@@@@@@@@");
        handleLogin(dbvalue);
      })
      .catch((e) => {
        setIsLoading(false);
        console.log("test444444",e);
        alert("Kindly purchase subscription from https://www.odoocommunityonline.com !")
        // alert("Please write the correct credentials !");
      });
      });
  };

  
          }
else{
      if(js.subs_id != subscribe){
        alert("You don't have any subscription !")
        
        setIsLoading(false);
      }
      if(max_user > js.max_users){
        alert("Your maximum number of user limit is reached!")
        
        setIsLoading(false);
      }
      if(date > exp_date){
        alert("Your membership has been expired kindly renew the subscription from https://www.odoocommunityonline.com !")
        setIsLoading(false);
      }
        const urlvalue = false
      }

        }, (error) => {
          console.log(error);
        });
}
  else{
        alert("Your database is expire kindly renew the subscription from https://www.odoocommunityonline.com !")
        const urlvalue = false
        setIsLoading(false);
      }
    })
};

  const handleLogin = (dbvalue) => {
    const url = `${values.url}/web/session/authenticate`;
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
          db: dbvalue,
          login: values.username,
          password: values.password,
        },
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        console.log("dbvalue@@@@@@@@@@@",values,data.result.db);
        if (data.result.db == dbvalue) {
          setIsLoading(false);
          navigation.navigate("Home", { values, database: dbvalue });
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        alert("Kindly enter the correct credentials !")
      });
  };

  const [isReady, setIsReady] = React.useState(false);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={_retrieveData}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>

    <Overlay
        isVisible={isLoading}
        windowBackgroundColor="#724e36"
        overlayBackgroundColor="white"
        width="auto"
        height="auto"
      >
        <ActivityIndicator size="large" color="#724e36" />
      </Overlay>

      <StatusBar backgroundColor={"black"} barStyle="light-content"></StatusBar>
      <ImageBackground source={require("../../assets/pexels-photo.jpeg")}
                style={{ flex: 1 }}>
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
                marginTop: 50,
                height: 200,
              }}
            >
              <Image
                source={require("../../assets/logo_black.png")}
                style={{ height: 240, width: 340 }}
              />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 30 }}>
              <Text style={{ color: "red", alignSelf: "center" }}>{error}</Text>

              <Input
                placeholder="https://yourcompany.com"
                leftIcon={
                  <FontAwesome5Icon
                    style={styles.icon}
                    name="globe-americas"
                    size={24}
                    color="black"
                  />
                }
                value={values.url}
                errorMessage=""
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                  paddingRight: 10,
                }}
                onChangeText={(url) => setValues({ ...values, url })}
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
                value={values.username}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(username) => setValues({ ...values, username })}
              />
              <Input
                secureTextEntry={true}
                leftIcon={
                  <FontAwesome5Icon
                    name="lock"
                    style={styles.icon}
                    size={24}
                    color="black"
                  />
                }
                value={values.password}
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
                onChangeText={(password) => setValues({ ...values, password })}
              />
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 40 }}>
              <Button
                raised
                loading={isLoading}
                title="LOGIN"
                onPress={fetchDbName}
                buttonStyle={{ backgroundColor: "black" }}
              />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Demo")}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "white",
                }}
              >
                Request Demo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Scanner")}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 16,
                  color: "white",
                }}
              >
                Have QR Code?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>
      </ImageBackground>
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

export default Login;
