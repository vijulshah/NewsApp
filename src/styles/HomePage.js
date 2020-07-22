import { StyleSheet } from 'react-native';
import colors from '../assets/colors.js';

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: colors.primaryLightest
    },

    flatList: {
        paddingLeft: 20,
        paddingRight: 20
    },

    card: {
        flex: 1,
        backgroundColor: colors.white,
    },

    articleImg: {
        height: 250
    },

    articleTitle: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 20,
        margin: 5,
        fontWeight: "bold",
        color: colors.primaryDark
    },

    authorContainer: {
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5,
        flexWrap: "wrap"
    },

    authorText: {
        fontSize: 15,
        color: colors.darkGrey,
        flexWrap: "wrap"
    },

    articleDesc: {
        fontSize: 17,
        color: colors.primaryDark,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        flexWrap: "wrap"
    },

    dateText: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        fontSize: 14,
        color: colors.darkGrey
    },

    readFullContainer: {
        backgroundColor: colors.primaryLightest,
        width: "100%",
        height: 50,
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center"
    },

    readFullText: {
        color: colors.offWhite,
        fontSize: 14
    },

    alertContainer: {
        backgroundColor: "rgba(0,0,0,0.7)", 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    alertModal: {
        alignSelf: "center",
        backgroundColor: colors.white,
        width: "90%",
        borderRadius: 5,
    },

    alertTitle: {
        alignSelf: "center",
        flexWrap: "wrap",
        textAlign: "center",
        fontSize: 18,
        color: colors.black,
        fontWeight: "bold"
    },

    modalCategoryBtn: {
        paddingLeft: 20,
        paddingBottom: 10,
        paddingRight: 20,
        paddingTop: 10,
        flex: 3,
        flexDirection: "row",
        alignItems: "center"
    },

    modalCatIcons: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        alignSelf: "center",
        marginRight: 20,
        tintColor: colors.darkGrey
    },

    modalCatText: {
        fontSize: 15,
        color: colors.black
    },

    footer: {
        padding: 15,
        flex: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.secondaryDark
    },

    footerText: {
        flex: 1, 
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: colors.white
    },

    modalProfileContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 5,
        paddingTop: 15,
        flexDirection: "row"
    },

    modelUserIconContainer: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
        marginRight: 15
    },  

    modalUserIcon: {
        alignSelf: "center",
        width: 50,
        height: 50,
        borderRadius: 50
    },

    modalUsername: {
        fontSize: 18,
        color: colors.black,
        fontWeight: "bold",
        marginBottom: 2
    },

    modalUserEmail: {
        fontSize: 15,
        color: colors.darkGrey,
        marginBottom: 10
    },

    loadingContainer: {
        height: 45,
        width: 45,
        borderRadius: 50,
        backgroundColor: colors.secondaryDark,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15
    }
});

export default styles;