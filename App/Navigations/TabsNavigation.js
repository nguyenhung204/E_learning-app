import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyCourses from '../Screen/MyCourses';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import HomeScreenNavigation from './HomeScreenNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import CourseDetailScreen from '../Screen/CourseDetailScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

function MyCoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyCoursesScreen" component={MyCourses} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

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
            <Tab.Screen name="My-course" component={MyCoursesStack}
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