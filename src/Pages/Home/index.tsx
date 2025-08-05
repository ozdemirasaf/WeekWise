import { StyleSheet, View } from "react-native";
import WeekCards from "../../Components/WeekCards";

export default function Home() {

    return (
        <View style={style.container}>
            <WeekCards />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        gap: 15
    },


})