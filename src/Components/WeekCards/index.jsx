import { TouchableOpacity, Text, FlatList } from "react-native";
import styles from "./styles";

import Data from '../../Data/Data'
import { useNavigation } from "@react-navigation/native";

export default function WeekCards() {

    const navigation = useNavigation();


    const location = (loc) => {
        navigation.navigate(loc)

    }

    return (
        <FlatList
            data={Data}
            keyExtractor={item => item.id}
            renderItem={({ item }) =>
                <TouchableOpacity onPress={() => location(item.location)} style={[styles.weekCard, { backgroundColor: item.color }]}>
                    <Text style={styles.weekCardTitle}>{item.title}</Text>
                </TouchableOpacity>

            }
        />
    )
}
