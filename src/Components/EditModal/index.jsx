import { useEffect, useState } from "react";
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";

export default function EditModal({ visible, onClose, task, onSave }) {
    const [title, setTitle] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [description, setDescription] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [selectingStartTime, setSelectingStartTime] = useState(true);

    // 🟢 String saati Date'e çevir
    const parseTimeString = (timeStr) => {
        const [hour, minute] = timeStr.split(":");
        const now = new Date();
        now.setHours(parseInt(hour));
        now.setMinutes(parseInt(minute));
        now.setSeconds(0);
        return now;
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setStartTime(parseTimeString(task.startTime));
            setEndTime(parseTimeString(task.endTime));
            setDescription(task.description);
        }
    }, [task]);

    const formattedTime = (date) =>
        date
            ? date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false, // AM/PM olmadan 24 saat formatı
            })
            : "--:--";

    const handleTimeChange = (event, selectedDate) => {
        if (event.type === "dismissed") {
            setShowPicker(false);
            return;
        }

        if (selectingStartTime) {
            setStartTime(selectedDate);
        } else {
            setEndTime(selectedDate);
        }

        setShowPicker(false);
    };

    const handleSave = async () => {
        if (!title || !startTime || !endTime || !description) {
            alert("Tüm alanları doldurun.");
            return;
        }

        const updatedTask = {
            title,
            startTime: formattedTime(startTime),
            endTime: formattedTime(endTime),
            description,
            index: task.index, // index varsa güncellenir
        };

        await onSave(updatedTask, task.index);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Görev Başlığı"
                            value={title}
                            onChangeText={setTitle}
                            maxLength={20}
                        />

                        <View style={styles.timeContainer}>
                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => {
                                    setSelectingStartTime(true);
                                    setShowPicker(true);
                                }}
                            >
                                <Text style={styles.timeButtonText}>
                                    Başlangıç:   {formattedTime(startTime)}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => {
                                    setSelectingStartTime(false);
                                    setShowPicker(true);
                                }}
                            >
                                <Text style={styles.timeButtonText}>
                                    Bitiş:   {formattedTime(endTime)}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {showPicker && (
                            <DateTimePicker
                                value={selectingStartTime ? startTime : endTime}
                                mode="time"
                                is24Hour={true}
                                display="spinner"
                                onChange={handleTimeChange}
                            />
                        )}

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Açıklama"
                            multiline={true}
                            numberOfLines={4}
                            value={description}
                            onChangeText={setDescription}
                        />

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
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
