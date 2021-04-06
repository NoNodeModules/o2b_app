import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


// screens
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";
import Contact from "./src/screens/Contact";
import Signup from "./src/screens/Signup";
import Store from "./src/screens/Store";
import Pricing from "./src/screens/Pricing";
import Demo from "./src/screens/Demo";
import Democrm from "./src/screens/Democrm";
import Demostart from "./src/screens/Demostart";
import Scanner from "./src/screens/Scanner";
import Qrlogin from "./src/screens/Qrlogin";
import Urlscanner from "./src/screens/Urlscanner";


const AuthStack = createStackNavigator(
  {
    Login: Login,
    Contact: Contact,
    Signup: Signup,
    Store: Store,
    Pricing : Pricing,
    Demo : Demo,
    Democrm : Democrm,
    Demostart : Demostart,
    Scanner : Scanner,
    Qrlogin : Qrlogin,
    Urlscanner : Urlscanner,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AppStack = createStackNavigator(
  {
    Home: Home,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Splash,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: "AuthLoading",
    }
  )
);

const App = () => {
  return <AppContainer />;
};

export default App;
