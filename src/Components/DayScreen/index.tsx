import React, { useState } from "react";
import { FlatList, SafeAreaView, Text, ListRenderItem } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import DutyCard from "../DutyCard";
import AddModal from "../AddModal";
import styles from "./styles";
import { TodoItem, TodoRemove } from "../../Redux/Todo/TodoSlice";

interface DayScreenProps {
    dayKey: string;
    dayTitle: string;
}

export default function DayScreen({ dayKey, dayTitle }: DayScreenProps) {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeCardId, setActiveCardId] = useState<string | null>(null);

    const tasks = useSelector((state: any) => state.todo.todos);
    const dispatch = useDispatch()

    const filteredTasks = tasks.filter((todo: TodoItem) => todo.dayKey === dayKey);

    const handleDelete = (id: string) => {
        console.log(id);
        
        dispatch(TodoRemove(id));
    };

    // Liste item render fonksiyonu
    const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
        <DutyCard
            task={item}
            onDelete={() => handleDelete(item.id)}
            isActive={activeCardId === String(item.id)}
            onPress={() =>
                setActiveCardId(activeCardId === String(item.id) ? null : String(item.id))
            }
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
            </SafeAreaView>
        </>
    );
}
