import React, { useEffect, useRef } from "react";
import { Text, View, FlatList, Alert, ListRenderItem } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";
import { Swipeable } from "react-native-gesture-handler";
import { TodoHide } from "../../Redux/Todo/TodoSlice";
import { getTodayDayKey } from "../../utils/dateUtils";
import { TodoItem } from '../../Redux/types/todo';

import DutyCard from "../../Components/DutyCard";
import styles from "./styles";
import RightActions from "../../Components/RenderRightActions";

function parseTaskTime(timeStr: string): Date {
    const now = new Date();
    const [hours, minutes] = timeStr.split(":").map(Number);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
}

export default function Home() {
    const dispatch = useDispatch();

    const todos = useSelector((state: RootState) => state.todo.todos);
    const hiddenTaskIds = useSelector((state: RootState) => state.todo.hiddenTaskIds);

    const todayDayKey = getTodayDayKey();

    const todayTasks = todos
        .filter(todo => todo.dayKey === todayDayKey)
        .filter(todo => !hiddenTaskIds.includes(todo.id));

    // Bildirim için planlanmış timeout ID'leri
    const notificationTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

    useEffect(() => {
        // Önce var olan timeoutları temizle
        Object.values(notificationTimeouts.current).forEach(clearTimeout);
        notificationTimeouts.current = {};

        const now = new Date();

        todayTasks.forEach(task => {
            const endDate = parseTaskTime(task.endTime);
            const diffMs = endDate.getTime() - now.getTime();
            const fiveMinutesMs = 5 * 60 * 1000;

            // Eğer bitiş zamanı 5 dakika içinde ama hala geçmiş değilse bildirimi planla
            if (diffMs > 0 && diffMs <= fiveMinutesMs) {
                const timeoutId = setTimeout(() => {
                    Alert.alert("Görev Bitti", `${task.title} görevi tamamlandı!`);
                    // Görev bildirildikten sonra temizle
                    delete notificationTimeouts.current[task.id];
                }, diffMs);

                const notificationTimeouts = useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({});
            }
        });

        // Component unmount olduğunda timeoutları temizle
        return () => {
            Object.values(notificationTimeouts.current).forEach(clearTimeout);
            notificationTimeouts.current = {};
        };
    }, [todayTasks]);

    const handleSwipeRight = (id: string) => {
        dispatch(TodoHide(id));
    };

    const renderItem: ListRenderItem<TodoItem> = ({ item }) => (
        <Swipeable
            renderRightActions={(progress, dragX) => (
                <RightActions progress={progress} dragX={dragX} />
            )}
            onSwipeableRightOpen={() => handleSwipeRight(item.id)}
        >
            <DutyCard type="tasks" task={item} />
        </Swipeable>
    );

    return (
        <View style={styles.container}>
            {todayTasks.length === 0 ? (
                <Text>Bugün için görev yok.</Text>
            ) : (
                <FlatList
                    data={todayTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            )}
        </View>
    );
}
