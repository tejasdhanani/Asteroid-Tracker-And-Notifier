import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import Settings from '../screens/Settings';
import ItemPage from '../screens/ItemPage';
import { COLORS } from '../../../assets/COLORS';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const Navigation = () => {
    function CalendarHeader() {
        return (
            <Stack.Navigator initialRouteName={HomeScreen} >
                <Stack.Screen
                    name="HomeScreen"
                    options={{
                        headerShown: false,
                    }}

                    component={HomeScreen}
                />
            </Stack.Navigator>
        )
    }
    function Root() {
        return (
            <Drawer.Navigator screenOptions={{
                headerStyle: { backgroundColor: COLORS.dimwhite },
                headerTintColor: COLORS.black,
                headerShadowVisible: false,
            }}>
                <Drawer.Screen
                    name="CalendarHeader"
                    component={CalendarHeader}
                    options={{
                        title: "Home",
                        headerTitle: "Asteroid Tracker",
                        headerStyle: { backgroundColor: COLORS.white },
                        headerTintColor: COLORS.black,
                        headerShadowVisible: false,
                    }}
                />
                <Drawer.Screen
                    name="Settings"
                    component={Settings}
                />
            </Drawer.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: { backgroundColor: COLORS.black },
                headerTintColor: COLORS.dimwhite,
                headerShadowVisible: false,
            }}>
                <Stack.Screen
                    name="Root"
                    component={Root}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ItemPage"
                    component={ItemPage}
                />
            </Stack.Navigator>
        </NavigationContainer>


    )
}

export default Navigation
