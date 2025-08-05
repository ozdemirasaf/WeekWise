import React, { useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    GestureResponderEvent,
} from "react-native";

import styles from "./styles";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useDispatch } from "react-redux";
import { TodoAdd } from "../../Redux/Todo/TodoSlice";

interface AddModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    dayKey: string;
}

export default function AddModal({
    modalVisible,
    setModalVisible,
    dayKey,
}: AddModalProps) {
    const [task, setTask] = useState<string>("");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [selectingStartTime, setSelectingStartTime] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");

    const dispatch = useDispatch();

    const handleTimeSelect = (event: DateTimePickerEvent, selectedDate?: Date | undefined) => {
        if (event.type === 'dismissed') {
            if (selectingStartTime) {
                setStartTime(null);
            } else {
                setEndTime(null);
            }
            setShowPicker(false);
            setSelectingStartTime(true);
            return;
        }

        if (selectedDate) {
            if (selectingStartTime) {
                setStartTime(selectedDate);
                setSelectingStartTime(false);
                setShowPicker(true);
            } else {
                setEndTime(selectedDate);
                setShowPicker(false);
                setSelectingStartTime(true);
            }
        }
    };


    const formattedTime = (date: Date | null): string =>
        date ? date.toLocaleTimeString().slice(0, 5) : "-- : --";

    const handleSave = () => {
        if (!task.trim() || !startTime || !endTime || !description.trim()) {
            alert("Lütfen tüm alanları eksiksiz doldurunuz.");
            return;
        }

        dispatch(
            TodoAdd({
                id: Math.random().toString(36).substring(2, 10),
                dayKey: dayKey,
                title: task,
                startTime: formattedTime(startTime),
                endTime: formattedTime(endTime),
                description: description,
            })
        );

        // Alanları temizle
        setTask("");
        setStartTime(null);
        setEndTime(null);
        setDescription("");
        setModalVisible(false);
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
                            onPress={() => setShowPicker(true)}
                            style={styles.input}
                        >
                            <Text style={{ fontSize: 16 }}>
                                Görev Zaman {formattedTime(startTime)} {formattedTime(endTime)}
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
                            <TouchableOpacity
                                style={styles.buttonClose}
                                onPress={() => setModalVisible(false)}
                            >
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
function alert(arg0: string) {
    throw new Error("Function not implemented.");
}

