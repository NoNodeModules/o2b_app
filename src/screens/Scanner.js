import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,Image, Button, AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";

export default function App({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // const values1 = navigation.getParam("values1", "default");
   // const database = navigation.getParam("database", "default");

  useEffect(() => {
    (async () => {
      try {
      AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          
          // get at each store's key/value so you can work with it
          if(store[i][0] === "data"){
            data = store[i][1];
            handleBarCodeScanned({data})
            
          }
         
          });
        });
      });
    }
  catch (error) {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
          // get at each store's key/value so you can work with it
          if(store[i][0] === "data"){
            data = store[i][1];

          }    
          });
        });
      });
    // Error retrieving data
  }

  
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("datadatadatadata",data);
    setScanned(true);
    console.log("data@@@@@@@@@@@22222222",data.split('+/-')[1]);
    console.log("datadatadatadata",data.split('/web')[0]);
    const url = data.split('/web')[0]
    const final_url = url+'/web/barcodelogin?barcode='+data.split('+/-')[1];
    console.log("final_url@@@@@@@@@@@",final_url);
    var ul = `${url}/get/expire_values`
    axios
      .get(`${url}/get/expire_values`)
      .then((response) => {
        console.log("response.data@@@@@@@@@@",response.data);
        const subscribe = response.data.subscription;
        const max_user = response.data.max_user;

      const urll = `${response.data.base_domain}/o2b/subscription_date`;
      console.log("response.data.subscription@@@@@@@@@@@@@",url);
      console.log("max_user@@@@@@@@@@@@@@",max_user);
      axios
      .post(urll,
        {
        params: {
          subscription_id :response.data.subscription,
          dbuuid: response.data.dbuuid,
        },
        })
        .then((response) => {
          var result = response.data.result
          const js = JSON.parse(result)
          var date = new Date()
          const exp_date = new Date(js.expiry_date)

          if (js.subs_id == subscribe && max_user <= js.max_users  && date <= exp_date){
            AsyncStorage.setItem('data', data);
            navigation.navigate("Qrlogin", { data: final_url});
          }
          else{
            if(js.subs_id != subscribe){
        alert("You don't have any subscription !")
        }
      if(max_user > js.max_users){

        alert("Your maximum number of user limit is reached!")
        }
      if(date > exp_date){
        alert("Your membership has been expired kindly renew the subscription from https://www.odoocommunityonline.com !")
      }
          }
      })
        .catch((e) => {
          alert("Your database is expire kindly renew the subscription from https://www.odoocommunityonline.com !")
        });
    })
      .catch((e) => {
        alert("Your database is expire kindly renew the subscription from https://www.odoocommunityonline.com !")
      });


    
  };

  if (hasPermission === null) {
    console.log("hasPermission@@@@@@@",hasPermission);
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    console.log("hasPermission!!!!!!!!!!!",hasPermission);
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
      showMarker={true}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
       <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <Image
          source={{
            uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          }}
        />
          <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
      </BarCodeScanner>

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
});

App.navigationOptions = {
  headerShown: true,
  title: "Scanner",
  headerStyle: {
    backgroundColor: "#724e36"
  },
};