import React, { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";

import styles from "./styles";

import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AddModal({ modalVisible, setModalVisible, dayKey, onSave }) {
    const [task, setTask] = useState("");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [selectingStartTime, setSelectingStartTime] = useState(true);
    const [description, setDescription] = useState("");

    const handleTimeSelect = (event, selectedDate) => {
        if (event.type === "dismissed") {
            // Eğer başlangıç zamanı seçiliyorsa, sadece onu sıfırla
            if (selectingStartTime) {
                setStartTime(null);
            } else {
                setEndTime(null);
            }

            setShowPicker(false);
            setSelectingStartTime(true); // bir sonraki açılışta yine başlangıçtan başlasın
            return;
        }

        // Zaman seçildiyse devam et
        if (selectedDate) {
            if (selectingStartTime) {
                setStartTime(selectedDate);
                setSelectingStartTime(false); // şimdi bitiş zamanı seçilecek
                setShowPicker(true); // picker açık kalmaya devam etsin
            } else {
                setEndTime(selectedDate);
                setShowPicker(false); // ikisi de seçildi, picker kapanır
                setSelectingStartTime(true); // tekrar başlangıçtan başlasın
            }
        }
    };

    const formattedTime = (date) =>
        date ? date.toLocaleTimeString().slice(0, 5) : "-- : --";


    const handleSave = async () => {
        if (!task.trim() || !startTime || !endTime || !description.trim()) {
            alert("Lütfen tüm alanları eksiksiz doldurunuz.");
            return;
        }

        const newTask = {
            id: Math.random().toString(36).substring(2, 10), // 🔑 eşsiz id
            title: task,
            startTime: formattedTime(startTime),
            endTime: formattedTime(endTime),
            description: description,
        };

        try {
            const existingData = await AsyncStorage.getItem(dayKey); // 🔥 dayKey kullandık
            const tasks = existingData ? JSON.parse(existingData) : [];
            const updatedTasks = [...tasks, newTask];

            await AsyncStorage.setItem(dayKey, JSON.stringify(updatedTasks)); // 🔥

            console.log("Yeni görev kaydedildi:", newTask);

            // Optional: state'i güncellemek için parent'a bildir
            if (onSave) {
                await onSave(newTask); // optional parametre
            }

            // Temizleme
            setModalVisible(false);
            setTask("");
            setStartTime(null);
            setEndTime(null);
            setDescription("");
        } catch (error) {
            console.error("Görev kaydederken hata:", error);
        }
    };






    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>

                        <TextInput
                            style={styles.input}
                            placeholder="Görev Başlığı Giriniz"
                            value={task}
                            onChangeText={setTask}
                            maxLength={20}
                        />


                        <TouchableOpacity
                            onPress={() => {
                                setShowPicker(true);
                                //setSelectingStartTime(true);
                            }}
                            style={styles.input}
                        >
                            <Text style={{ fontSize: 16 }}>
                                Görev Zaman   {formattedTime(startTime)}     {formattedTime(endTime)}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={new Date()}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onChange={handleTimeSelect}
                            />
                        )}

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Açıklama giriniz"
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                            textAlignVertical="top"
                        />




                        <View style={styles.buttonContainer}>

                            <TouchableOpacity style={styles.buttonClose} onPress={() => setModalVisible(false)}>
                                <Text style={styles.buttonText}>Kapat</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                                <Text style={styles.buttonText}>Kaydet</Text>
                            </TouchableOpacity>




                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}


