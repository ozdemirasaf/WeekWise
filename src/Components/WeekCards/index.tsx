import React from "react";
import { TouchableOpacity, Text, FlatList, ListRenderItem } from "react-native";
import styles from "./styles";
import Data from "../../Data/Data";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface WeekCardItem {
    id: number;
    title: string;
    color: string;
    location: string;
}

export default function WeekCards() {
    const navigation = useNavigation<NavigationProp<any>>();

    const handleNavigate = (loc: string) => {
        navigation.navigate(loc);
    };

    const renderItem: ListRenderItem<WeekCardItem> = ({ item }) => (
        <TouchableOpacity
            onPress={() => handleNavigate(item.location)}
            style={[styles.weekCard, { backgroundColor: item.color }]}
        >
            <Text style={styles.weekCardTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={Data}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
        />
    );
}
