import React, { useState, useEffect, useCallback } from "react";
import {
    Modal,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";

import styles from "./styles";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { useDispatch } from "react-redux";
import { TodoUpdate } from "../../Redux/Todo/TodoSlice";

import { TodoItem } from '../../Redux/types/todo'


interface EditModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    dayKey: string;
    task: TodoItem | null;
}

const parseTime = (timeStr: string): Date | null => {
    if (!timeStr || timeStr === "-- : --") return null;
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
};

const formatTime = (date: Date | null): string => {
    if (!date) return "-- : --";
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
};

export default function EditModal({
    modalVisible,
    setModalVisible,
    dayKey,
    task,
}: EditModalProps) {
    const [title, setTitle] = useState<string>("");
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [selectingStartTime, setSelectingStartTime] = useState<boolean>(true);
    const [description, setDescription] = useState<string>("");

    const dispatch = useDispatch();

    const resetForm = useCallback(() => {
        setTitle("");
        setStartTime(null);
        setEndTime(null);
        setDescription("");
        setSelectingStartTime(true);
        setShowPicker(false);
    }, []);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStartTime(parseTime(task.startTime));
            setEndTime(parseTime(task.endTime));
        } else {
            resetForm();
        }
    }, [task, resetForm]);

    useEffect(() => {
        if (!modalVisible) {
            resetForm();
        }
    }, [modalVisible, resetForm]);

    useEffect(() => {
        if (!selectingStartTime) {
            setShowPicker(true);
        }
    }, [selectingStartTime]);

    const handleTimeSelect = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
        if (event.type === 'dismissed') {
            setShowPicker(false);
            setSelectingStartTime(true);
            return;
        }

        if (selectedDate) {
            if (selectingStartTime) {
                setStartTime(selectedDate);
                setSelectingStartTime(false);
            } else {
                if (startTime && selectedDate < startTime) {
                    Alert.alert("Hata", "Bitiş zamanı başlangıç zamanından önce olamaz.");
                    return;
                }
                setEndTime(selectedDate);
                setShowPicker(false);
                setSelectingStartTime(true);
            }
        }
    }, [selectingStartTime, startTime]);

    const handleSave = () => {
        if (!title.trim() || !startTime || !endTime || !description.trim()) {
            Alert.alert("Uyarı", "Lütfen tüm alanları eksiksiz doldurunuz.");
            return;
        }
        if (!task) return;

        dispatch(TodoUpdate({
            id: task.id,
            dayKey,
            title,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime),
            description,
        }));

        setModalVisible(false);
        resetForm();
    };

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Görev Başlığı Giriniz"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={20}
                            autoFocus
                        />

                        <TouchableOpacity
                            onPress={() => setShowPicker(true)}
                            style={styles.input}
                        >
                            <Text style={{ fontSize: 16 }}>
                                Görev Zaman {formatTime(startTime)} - {formatTime(endTime)}
                            </Text>
                        </TouchableOpacity>

                        {showPicker && (
                            <DateTimePicker
                                value={selectingStartTime ? (startTime || new Date()) : (endTime || new Date())}
                                mode="time"
                                is24Hour
                                display="spinner"
                                onChange={handleTimeSelect}
                            />
                        )}

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Açıklama giriniz"
                            multiline
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

                            <TouchableOpacity
                                style={styles.buttonSave}
                                onPress={handleSave}
                            >
                                <Text style={styles.buttonText}>Kaydet</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
