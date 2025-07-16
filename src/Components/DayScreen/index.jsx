import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scheduleNotificationr } from "../../utils/scheduleNotification";


import Header from "../../Components/Header";
import DutyCard from "../../Components/DutyCard";
import AddModal from "../../Components/AddModal";
import EditModal from "../../Components/EditModal";

import styles from "./styles";

export default function DayScreen({ dayKey, dayTitle }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [activeCardId, setActiveCardId] = useState(null);
    const [editTask, setEditTask] = useState(null);

    const loadTasks = async () => {
        const stored = await AsyncStorage.getItem(dayKey);
        const parsed = stored ? JSON.parse(stored) : [];
        setTasks(parsed);
    };

    useEffect(() => {
        loadTasks();
    }, [modalVisible, dayKey]);

    const handleDelete = async (taskToDelete) => {
        const updated = tasks.filter((t) => t !== taskToDelete);
        await AsyncStorage.setItem(dayKey, JSON.stringify(updated));
        setTasks(updated);
    };

    const handleSave = async (updatedTask, index = null) => {
        let updatedTasks;
        if (index !== null) {
            updatedTasks = [...tasks];
            updatedTasks[index] = updatedTask;
        } else {
            updatedTasks = [...tasks, updatedTask];
        }
        await AsyncStorage.setItem(dayKey, JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };


    
    return (
        <>
            <Header title={dayTitle} onAddPress={() => setModalVisible(true)} />

            <SafeAreaView style={styles.container}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <DutyCard
                            task={{ ...item, index }}
                            extraData={tasks}
                            isActive={activeCardId === index}
                            onPress={() =>
                                setActiveCardId(activeCardId === index ? null : index)
                            }
                            onDelete={() => handleDelete(item)}
                            onEdit={() => {
                                setEditTask({ ...item, index });
                                setModalVisible(true);
                            }}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>Henüz görev yok.</Text>
                    }
                />
                <AddModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    dayKey={dayKey} // 🔥 yeni ekle
                    onSave={handleSave} // 🔥 handleSave fonksiyonunu AddModal'a veriyoruz
                />

                <EditModal
                    visible={!!editTask}
                    task={editTask}
                    onClose={() => setEditTask(null)}
                    onSave={handleSave}
                />
            </SafeAreaView>
        </>
    );
}
