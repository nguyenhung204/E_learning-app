import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import SubHeading from '../SubHeading';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { getProgressCourse } from '../../Services/services';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CourseProgress = () => {
    const  navigation  = useNavigation();
    const { user } = useUser();
    const [progressCourse, setProgressCourse] = useState();

    
    useEffect(() => {
        user && getProgressUserCourse()
    }, [user])

    const getProgressUserCourse = async() => {
        try {
            // Check cache first
            const cachedProgress = await AsyncStorage.getAllKeys()
                .then(keys => keys.filter(key => key.startsWith('enrolled-course-')))
                .then(keys => Promise.all(keys.map(key => AsyncStorage.getItem(key))))
                .then(items => items.map(item => JSON.parse(item)));

            if (cachedProgress.length > 0) {
                // Update UI immediately with cached data
                setProgressCourse(cachedProgress.map(item => ({
                    course: item.course,
                    completedChapter: item.completedChapter || []
                })));
            }

            // Then fetch from server to update
            const serverData = await getProgressCourse(user.primaryEmailAddress.emailAddress);
            setProgressCourse(serverData.userConrolledCourses);

        } catch (error) {
            console.error('Error fetching progress:', error);
        }
    }

    if (!progressCourse || progressCourse.length === 0) {
        return null;
    }

    return progressCourse&&(
        <View>
            <SubHeading text={"In Progress"} color={Colors.BLACK} />

            <FlatList
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                windowSize={5}
                data={progressCourse}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                    onPress={() => {
                        navigation.navigate('CourseDetail', {
                            course: item.course,
                        })
                    }}
                    >
                        <CourseItem item={item.course}
                            completedChapter={item?.completedChapter?.length}
                         />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default CourseProgress;
