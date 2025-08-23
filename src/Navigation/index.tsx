import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import Monday from "../Pages/Monday";
import Home from "../Pages/Home";
import Tuesday from "../Pages/Tuesday";
import Wednesday from "../Pages/Wednesday";
import Thursday from "../Pages/Thursday";
import Friday from "../Pages/Friday";
import Saturday from "../Pages/Saturday";
import Sunday from "../Pages/Sunday";
import Week from "../Pages/Weeks";
import Profile from "../Pages/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Weeks() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Weeks"
                component={Week}
                options={{ headerTitle: "Haftalar" }}
            />
            <Stack.Screen
                name="Mon"
                component={Monday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Tue"
                component={Tuesday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Wed"
                component={Wednesday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Thu"
                component={Thursday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Fri"
                component={Friday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Sat"
                component={Saturday}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Sun"
                component={Sunday}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName = "";

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "week") {
                            iconName = "calendar";
                        } else if (route.name === "Profile") {
                            iconName = "user";
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: "#007AFF",
                    tabBarInactiveTintColor: "gray",
                    headerTitleAlign: "center",
                    tabBarStyle: {
                        position: "absolute",
                        marginHorizontal: 20,
                        marginBottom: 15,
                        marginTop: 10,
                        backgroundColor: "white",
                        borderRadius: 30,
                        height: 60,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 5,
                        elevation: 5,
                        borderTopWidth: 0,
                    },
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        headerTitle: "Görevler",
                        tabBarLabel: "Görevler",
                    }}
                />
                <Tab.Screen
                    name="week"
                    component={Weeks}
                    options={{
                        headerShown: false,
                        tabBarLabel: "Haftalar",
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        headerTitle: "Profilim",
                        tabBarLabel: "Profilim",
                    }}
                />
            </Tab.Navigator>


        </NavigationContainer>
    );
}
