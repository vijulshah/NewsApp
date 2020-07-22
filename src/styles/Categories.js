import { StyleSheet } from 'react-native';
import colors from '../assets/colors.js';

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.primaryLightest
    },

    cardContainer: {
        flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 15
    },

    cardImg: {
        height: 150, width: 150, borderRadius: 10
    },

    selectedImg: {
        height: 40, width: 40, position: "absolute", zIndex: 5, top: 10, right: 40
    },

    itemText: {
        fontSize: 18, color: colors.white, margin: 5
    }
});

export default styles;