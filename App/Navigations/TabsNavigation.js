import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyCourses from '../Screen/MyCourses';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="home" component={HomeScreenNavigation}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="My-course" component={MyCourses}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Leader-board" component={LeaderBoard}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="leaderboard" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name="Profile" component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="supervised-user-circle" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}