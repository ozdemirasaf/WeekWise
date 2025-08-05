import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import styles from "./styles";
import { TodoItem } from "../../Redux/Todo/TodoSlice";

interface DutyCardProps {
    task: TodoItem;
    isActive: boolean;
    onPress: () => void;
    onDelete: () => void;
    onUpdate: () => void;  // Düzenleme fonksiyonu eklendi
}

export default function DutyCard({ task, isActive, onPress, onDelete, onUpdate }: DutyCardProps) {
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

                    <TouchableOpacity onPress={onUpdate}>
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
