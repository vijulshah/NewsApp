import { StyleSheet } from 'react-native';
import colors from '../assets/colors.js';

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white
    },

    appTitle: {
        fontSize: 30,
        color: colors.primary,
        fontWeight: "bold"
    },

    appSubTitle: {
        fontSize: 16,
        color: colors.primary
    },

    loginSignupButton: {
        elevation: 5
    }
});

export default styles;