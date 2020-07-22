import { StyleSheet } from 'react-native';
import colors from '../assets/colors.js';

const styles = StyleSheet.create({

    mainContainer: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        backgroundColor: colors.primaryDark,
        alignItems: "center",
        justifyContent: "center"
    },

    title: {
        fontSize: 22,
        alignSelf:"center",
        color: colors.white
    },

    button: {
        position: "absolute",
        height: 50,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.primaryDark
    },

    filterIcon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
        tintColor: colors.secondaryDark
    },

    settingsIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        tintColor: colors.secondaryDark
    }
});

export default styles;