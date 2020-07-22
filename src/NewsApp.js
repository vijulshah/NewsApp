import React from 'react';  
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//firebase
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
//Auth
import LoginSignup from './authentication/LoginSignup.js';
//Home
import HomePage from './home/HomePage.js';
//Webview
import ShowWebview from './webView/ShowWebview.js';
//imports
import firebaseConfig from './configs/FirebaseConfigs.js';

const AuthNavigator = createStackNavigator({

    LoginSignup: {screen: LoginSignup}
},
{
    initialRouteName: 'LoginSignup',
    defaultNavigationOptions: {
        headerShown: false
    }
});

const HomeNavigator = createStackNavigator({

    HomePage: {screen: HomePage}
},
{
    initialRouteName: 'HomePage',
    defaultNavigationOptions: {
        headerShown: false
    }
});

const AppNavigator = createStackNavigator({

    HomeNavigator: { screen: HomeNavigator },
    ShowWebview: { screen: ShowWebview }
},
{
    initialRouteName: "HomeNavigator",
    defaultNavigationOptions: {
        headerShown: false
    }
});

const SwitchNavigator = createSwitchNavigator({

    AuthNavigator: { screen: AuthNavigator },
    AppNavigator: { screen: AppNavigator }
},
{
    initialRouteName: 'AuthNavigator',
    defaultNavigationOptions: {
        headerShown: false
    }
});

const AppNav = createAppContainer(SwitchNavigator);

class NewsApp extends React.Component {

    constructor(props){
        super(props);
          
        if (!firebase.apps.length) 
        {
            firebase.initializeApp(firebaseConfig);
        }
    }

    render() {
        return(
            <AppNav />
        );
    }
}

export default NewsApp;