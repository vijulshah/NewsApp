//react-native
import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
//plugins
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
//redux
import { connect } from 'react-redux';
import { setUserId, setEmailId, setDisplayName, setPhotoURL } from '../redux/actions/SetUserData.js';
//Firebase
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
//imports
import ApiKeys from '../configs/ApiKeys.json';
import styles from '../styles/LoginSignup.js';

class LoginSignup extends React.Component {

    constructor(props){
        super(props);

        AsyncStorage.getItem("userData").then((data)=>{
            let userData = JSON.parse(data);
            if(userData.uid)
            {
                this.storeReduxData(userData);
                this.props.navigation.navigate("AppNavigator");
            }
        })
        .catch((error)=>{
            console.log("No user found",error);
        });

        this.state = {
            isSigninInProgress: false
        }
    }
    
    componentDidMount() {

        GoogleSignin.configure({
            webClientId: ApiKeys.webClientId,
            offlineAccess: true
        });
    }

    render(){
        return(
            <View style={styles.mainContainer}>
                <Text style={styles.appTitle}>News App</Text>
                <Text style={styles.appSubTitle}>Get the latest news here</Text>
                <GoogleSigninButton
                    style={styles.loginSignupButton}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={()=>this.doLogin()}
                    disabled={this.state.isSigninInProgress} />
            </View>
        );
    }

    doLogin = async() => {
        this.setState({ isSigninInProgress: true });
        try
        {
            await GoogleSignin.signInSilently();
            let uid = firebase.auth().currentUser.uid;

            let docRef = await firestore().collection("Users").doc(uid).get();
            let user = docRef.data();

            this.storeReduxData(user);
            await AsyncStorage.setItem('userData',JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
            this.setState({ isSigninInProgress: false });
            this.props.navigation.navigate("Home");
        }
        catch (error)
        {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) 
            {
                this.signIn();
            } 
            else 
            {
                this.setState({ isSigninInProgress: false });
                console.log("Error : ",error);
            }
        }
    }

    signIn = async () => {
        try 
        {
            await GoogleSignin.hasPlayServices();
            let userInfo = await GoogleSignin.signIn();

            var credential = auth.GoogleAuthProvider.credential(userInfo.idToken);

            let response = await auth().signInWithCredential(credential);
            let user = response.user;
            
            this.storeUserDetails(user);
        } 
        catch (error) 
        {
            this.setState({ isSigninInProgress: false });
            console.log("Error : ",error);
        }
    }

    storeUserDetails = async(user) => {

        firestore().collection("Users").doc(user.uid).set({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        })
        .then(()=>{
            this.storeReduxData(user);
        })
        .then(async()=>{
            await AsyncStorage.setItem('userData',JSON.stringify({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
            this.setState({ isSigninInProgress: false });
            this.props.navigation.navigate("Home");
        })
        .catch((error)=>{
            this.setState({ isSigninInProgress: false });
            console.log("Error : ",error);
        });
    }

    storeReduxData = (user) => {
        this.props.setUserId(user.uid);
        this.props.setEmailId(user.email);
        this.props.setDisplayName(user.displayName);
        this.props.setPhotoURL(user.photoURL);
    }
}

const mapStatetoProps = (state) => ({
    userId: state.userData.userId,
    emailId : state.userData.emailId,
    displayName : state.userData.displayName,
    photoURL : state.userData.photoURL
});

export default connect(mapStatetoProps,{ setUserId,setEmailId,setDisplayName,setPhotoURL })(LoginSignup);

