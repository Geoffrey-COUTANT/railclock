import {StyleSheet} from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        flex: 1
    },
    full: {
        flex: 1,
    },
    headerImage: {
        height: 250,
    },
    list: {
        display: "flex",
    },
    listRight: {
        display: "flex",
        alignItems: "flex-end",
    },
    horizontalList: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
    },
    iconDim: {
        color: "black",
        opacity: 0.5
    },
    icon: {
        color: "black"
    },
    paddedBox: {
        padding: 20,
    },
    title: {
        fontSize: 25,
        fontFamily: "BricolageGrotesqueSemiBold",
        lineHeight: 30
    },
    textBody: {
        fontSize: 18,
        fontFamily: "BricolageGrotesqueRegular",
    },
    hourText: {
        fontSize: 30,
        fontFamily: "BricolageGrotesqueBold",
        lineHeight: 30
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    }
});
