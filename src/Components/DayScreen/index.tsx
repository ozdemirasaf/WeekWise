import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, ListRenderItem } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import DutyCard from "../DutyCard";
import AddModal from "../AddModal";
import EditModal from "../EditModal";
import styles from "./styles";
import { TodoItem, TodoRemove } from "../../Redux/Todo/TodoSlice";

interface DayScreenProps {
    dayKey: string;
    dayTitle: string;
}

export default function DayScreen({ dayKey, dayTitle }: DayScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editTask, setEditTask] = useState<TodoItem | null>(null);  // Düzenlenecek görev

    const tasks = useSelector((state: any) => state.todo.todos);
    const dispatch = useDispatch();

    const filteredTasks = tasks.filter((todo: TodoItem) => todo.dayKey === dayKey);

    const handleDelete = (id: string) => {
        dispatch(TodoRemove(id));
    };

    const handleEdit = (task: TodoItem) => {
        setEditTask(task);
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
        setEditTask(null);
    };

    const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
        <DutyCard
            task={item}
            isActive={activeCardId === item.id}
            onPress={() => setActiveCardId(activeCardId === item.id ? null : item.id)}
            onDelete={() => handleDelete(item.id)}
            onUpdate={() => handleEdit(item)}  // Düzenleme modalını açar
        />
    );

    return (
        <>
            <Header title={dayTitle} onAddPress={() => setModalVisible(true)} />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    ListEmptyComponent={<Text style={styles.emptyText}>Henüz görev yok.</Text>}
                />

                <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} dayKey={dayKey} />

                <EditModal
                    modalVisible={editModalVisible}
                    setModalVisible={handleCloseEditModal}
                    dayKey={dayKey}
                    task={editTask}
                />

            </SafeAreaView>
        </>
    );
}
