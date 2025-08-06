import React from "react";
import {Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import DutyCard from "../../Components/DutyCard";
import type { RootState } from "../../Redux/store";
import styles from "./styles";

const getTodayDayKey = () => {
    const days = ["sundayTasks", "mondayTasks", "tuesdayTasks", "wednesdayTasks", "thursdayTasks", "fridayTasks", "saturdayTasks"];
    return days[new Date().getDay()];
};

export default function Home() {
    const todos = useSelector((state: RootState) => state.todo.todos);
    const todayDayKey = getTodayDayKey();

    console.log(todayDayKey);


    const todayTasks = todos.filter((todo) => todo.dayKey === todayDayKey);

    return (
        <View style={styles.container}>
            {todayTasks.length === 0 ? (
                <Text>Bugün için görev yok.</Text>
            ) : (
                <FlatList
                    data={todayTasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <DutyCard task={item} isActive={false} onPress={function (): void {
                        throw new Error("Function not implemented.");
                    }} onDelete={function (): void {
                        throw new Error("Function not implemented.");
                    }} onUpdate={function (): void {
                        throw new Error("Function not implemented.");
                    }} />}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                />
            )}
        </View>
    );
}
