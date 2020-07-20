//react-native
import React from 'react';
import { View, Text, AsyncStorage, TouchableOpacity } from 'react-native';
//redux
import { connect } from 'react-redux';
import { setUserId, setEmailId, setDisplayName, setPhotoURL } from '../redux/actions/SetUserData.js';
//Firebase
import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
//imports
import ApiKeys from '../configs/ApiKeys.json';
import styles from '../styles/HomePage.js';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>

            </View>
        );
    }
}

const mapStatetoProps = (state) => ({
    userId: state.userData.userId,
    emailId : state.userData.emailId,
    displayName : state.userData.displayName,
    photoURL : state.userData.photoURL
});

export default connect(mapStatetoProps,{ setUserId,setEmailId,setDisplayName,setPhotoURL })(HomePage);