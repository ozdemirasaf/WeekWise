import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Monday from "../Pages/Monday";
import Home from "../Pages/Home";
import Tuesday from "../Pages/Tuesday";
import Wednesday from "../Pages/Wednesday";
import Thursday from "../Pages/Thursday";
import Friday from "../Pages/Friday";
import Saturday from "../Pages/Saturday";
import Sunday from "../Pages/Sunday";

const Stack = createNativeStackNavigator();

function Weeks() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePage" options={{ headerTitle: 'Anasayfa' }} component={Home} />
            <Stack.Screen
                name="Mon"
                component={Monday}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Tue" component={Tuesday} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Wed" component={Wednesday} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Thu" component={Thursday} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Fri" component={Friday} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Sat" component={Saturday} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Sun" component={Sunday} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}


export default function Navigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>

                <Stack.Screen name="Home" options={{ headerShown: false }} component={Weeks} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}