import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

export default function DutyCard({ task, isActive, onPress, onDelete, onEdit }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            activeOpacity={0.8}
        >

            <View style={styles.header}>
                <Text style={{ fontWeight: "bold" }}>{task.title}</Text>

                <View style={styles.headerTime}>
                    <Text>{task.startTime}</Text>
                    <Text>{task.endTime}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text>{task.description}</Text>
            </View>

            {isActive && (
                <View style={styles.actions}>

                    <TouchableOpacity>
                        <Feather name='check-square' size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onEdit}>
                        <Feather name='edit' size={24} />
                    </TouchableOpacity>


                    <TouchableOpacity onPress={onDelete}>
                        <Feather name='trash' size={24} />
                    </TouchableOpacity>

                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
        justifyContent : 'flex-end',
        gap : 15,
        marginTop : 10

    },
    actionBtn: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
});
