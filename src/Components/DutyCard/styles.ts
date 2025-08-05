import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: "#efeefc",
        padding: 15,
        borderRadius: 16,
        marginBottom: 10,
        position: "relative",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    headerTime: {
        flexDirection: "row",
        gap: 15,
    },
    content: {},
    actions: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        gap: 15,
        marginTop: 10

    },
    actionBtn: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
});