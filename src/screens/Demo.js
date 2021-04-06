import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import FontAwesome5Icon from "@expo/vector-icons/FontAwesome5";
import CountryPicker , { DARK_THEME } from 'react-native-country-picker-modal';
import { AsyncStorage } from 'react-native';  
import * as Localization from 'expo-localization';  
import i18n from 'i18n-js';
import { Input, Button } from "react-native-elements";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";

const Demo = ({ navigation }) => {
  const [values1, setValues] = useState({
    //url: "https://drwise.o2btechnologies.com",
    //username: "demo",
    //password: "demo",
    url: "https://www.o2btechnologies.com",
    email: "",
    username: "",
    company: "",
    phone: "",

  });


  const [countryCode, setCountryCode] = useState('US')  
  const [country, setCountry] = useState({  
  "cca2": "US", 
  "currency": [ 
    "USD" 
  ],  
  "callingCode": [  
    "1" 
  ],  
  "region": "Americas", 
  "subregion": "North America", 
  "flag": "flag-us",  
  "name": "United States" 
} 
) 
  const [withCallingCodeButton, setWithCallingCodeButton] = useState(true)  
    
  const [withLanguage, setWithLanguage] = useState(true)  
  const [withFlag, setWithFlag] = useState(true)  
  const [withEmoji, setWithEmoji] = useState(true)  
  const [withFilter, setWithFilter] = useState(true)  
  const [withAlphaFilter, setWithAlphaFilter] = useState(true)  
  const [withCallingCode, setWithCallingCode] = useState(true)  
  

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [url, setUrl] = useState(""); 
  const [isEmailIn, setisEmailIn] = useState(false);  
  const [isEmailType, setisEmailType] = useState(false);

  const onSelect = (country) => { 
  console.log("country@@@@@@@@@@@@@@@@",country); 
    setCountryCode(country.cca2)  
    setCountry(country) 
    var countrycode = JSON.stringify(country, null, 2)  
    console.log("countrycode@@@@@@@@@@@@@@@@",countrycode); 
      
  } 
  const  handleEmail = (email) => { 
    console.log("handleEmail@@@@@@@@@@",email);
    axios 
      .get(`https://www.o2btechnologies.com/email/validation`, {  
        params: { 
          email: email, 
        },  
      })  
      .then((response) => { 
        console.log("response@@@@@@@@@1111",response.data.validation);  
        var valid = response.data.validation  
        if(valid == null){  
          setIsLoading(false);  
          setisEmailIn(true)  
          setisEmailType(false);  
        } 
        if (valid == true){ 
          setisEmailIn(true)  
          setisEmailType(true); 
          //setError("Your mail id is correct!"); 
        } 
        if (valid == false){  
          setisEmailIn(false) 
          setisEmailType(true); 
          //setError("Your mail id is correct!"); 
        } 
      })  
      .catch((e) => { 
      console.log("test2222221111",e);  
      setIsLoading(false);  
      setisEmailIn(true)  
      setisEmailType(false);  
       //setError("enter the correct mail id"); 
      }); 
      setValues({ email: email, 
                  username: values1.username, 
                  company : values1.company,  
                  phone: values1.phone  
                 }) 
   }

  const fetchDbN = () => {
    //https://drwise.o2btechnologies.com/o2b/database?pass=supervisor351

    setIsLoading(true);
    const mail = values1.email
    if (isEmailType == false){  
          console.log("setisEmailType@@@@@@@@@@@@@@@@@@",isEmailType);  
          setIsLoading(false);  
          alert("Kindly enter the correct mail id !");  
        } 


        if (country != true){ 
          console.log("true@@@@@@@@@@@@@@@@@",country)  
          var countrycode = JSON.stringify(country, null, 2)  
          console.log("countrycode@@@@@@@@@@@@@@@@55555555555",country.callingCode[0], country.currency[0], country.cca2);  
          var calling_code = country.callingCode[0]
          console.log("calling_code@@@@@@@@@@@@@@@@@@",calling_code); 
          var currency =  country.currency[0] 
          console.log("currency@@@@@@@@@@@@@@@@@@",currency);
          var country_code = country.cca2 
          console.log("country_code@@@@@@@@@@@@@@@@@@",country_code);
          var locale = Localization.locale; 
          console.log("locale@@@@@@@@@@@@@@@@@@",locale);
          var timezone = Localization.timezone; 
          console.log("timezone@@@@@@@@@@@@@@@@@@",timezone);
          if(/-/.test(locale)){ 
            var lang1 = locale.split('-') 
            var language = lang1[0] + '_' + lang1[1]; 
          } 
        }

        if(isEmailType == true && values1.company && values1.phone && values1.username){


    axios
      .get(`https://www.o2btechnologies.com/o2b/database`, {
        params: {
          pass: "supervisor351",
        },
      })
      .then((response) => {
        console.log("response@@@@@@@@@@@@@@@@@@@@@@@@@@@@@",response);
        let data = response.data;

        console.log("data",data.database[0]);
        const dbvalue = data.database[0];
        const mail = values1.email
        
        if(values1.username && values1.company && values1.email){
        navigation.navigate("Democrm", { values1, database: dbvalue, country_code : country_code , calling_code : calling_code, currency : currency, language : language, timezone: timezone});
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
    }
    else{ 
      setIsLoading(false);  
      alert("Kindly enter all required field !"); 
    }
  };

  return (
    <View style={styles.container}>
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
                marginTop: 30,
                height: 200,
              }}
            >
              <Image
                source={require("../../assets/logo_black.png")}
                style={{ height: 240, width: 340 }}
              />
            </View>
          </View>
          <Text
                style={{
                  alignSelf: "center",
                  marginTop: 20,
                  fontSize: 30,
                  color: "white",
                }}
              >
                Request Demo
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
                onChangeText={handleEmail}
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
                leftIcon={
                  <FontAwesome5Icon
                    name="globe-americas"
                    style={styles.icon}
                    size={24}
                    color="black"
                  />
                }
                value={values1.company}
                placeholder="Company"
                inputStyle={{
                  color: "black",
                }}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(company) => setValues({ ...values1, company })}
              />
              <Input
                leftIcon={
                  <CountryPicker  
                    {...{ 
                      countryCode,  
                      withFilter, 
                      withFlag, 
                      withCallingCodeButton,  
                      withAlphaFilter,  
                      withCallingCode,  
                      withLanguage, 
                      withEmoji,  
                      onSelect, 
                    }}  
                  />
                }
                value={values1.phone}
                placeholder="Phone Number"
                inputStyle={{
                  color: "black",
                  fontSize: 16, 
                  marginLeft: 5,
                }}
                keyboardType={'numeric'}
                inputContainerStyle={{
                  marginVertical: 10,
                  borderColor: "black",
                  backgroundColor: "white",
                }}
                errorMessage=""
                onChangeText={(phone) => setValues({ ...values1, phone })}
              />
            </View>
            <View style={{ marginTop: 40, marginHorizontal: 40 }}>
              <Button
                raised
                loading={isLoading}
                title="Demo"
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
                Already have an account?
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
  },
  icon: {
    marginHorizontal: 10,
  },
});

export default Demo;
