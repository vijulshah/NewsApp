import { StyleSheet, Dimensions } from 'react-native';
import colors from '../assets/colors.js';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primaryLight
    },

    appLogo: {
        height: 100,
        width: 160,
        position: "absolute",
        top: 20
    },

    appTitle: {
        fontSize: 30,
        color: colors.secondaryLight,
        fontWeight: "bold",
        position: "absolute",
        top: 120
    },

    appSubTitle: {
        fontSize: 16,
        color: colors.white,
        position: "absolute",
        top: 160
    },

    loginSignupButton: {
        elevation: 5
    },

    bg1: {
        backgroundColor: colors.secondaryDark,
        borderRadius: 500,
        height: height/3,
        width: width,
        position: "absolute",
        bottom: -100
    }
});

export default styles;