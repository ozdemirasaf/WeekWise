import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import styles from "./styles";
import { TodoItem } from '../../Redux/types/todo'


interface BaseProps {
    type: "tasks" | "weeks";
    task: TodoItem;
}

interface TasksProps extends BaseProps {
    type: "tasks";
    // tasks tipinde fonksiyonlar yok
}

interface WeeksProps extends BaseProps {
    type: "weeks";
    isActive: boolean;
    onPress: () => void;
    onDelete: () => void;
    onUpdate: () => void;
}

type DutyCardProps = TasksProps | WeeksProps;

export default function DutyCard(props: DutyCardProps) {
    const { type, task } = props;

    return (
        <TouchableOpacity
            onPress={type === "weeks" ? props.onPress : undefined}
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

            {type === "weeks" && props.isActive && (
                <View style={styles.actions}>
                    <TouchableOpacity onPress={props.onDelete}>
                        <Feather name="trash" size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={props.onUpdate}>
                        <Feather name="edit" size={24} />
                    </TouchableOpacity>
                </View>
            )}
        </TouchableOpacity>
    );
}
