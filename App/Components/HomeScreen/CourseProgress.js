import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import SubHeading from '../SubHeading';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { getProgressCourse } from '../../Services/services';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';


const CourseProgress = () => {
    const  navigation  = useNavigation();
    const { user } = useUser();
    const [progressCourse, setProgressCourse] = useState();
    useEffect(() => {
        user && getProgressUserCourse()
    }, [user])

    const getProgressUserCourse = () => {
        getProgressCourse(user.primaryEmailAddress.emailAddress).then(resp => {
            console.log(resp.userConrolledCourses);
            setProgressCourse(resp.userConrolledCourses);
        })
    }

    if (!progressCourse || progressCourse.length === 0) {
        return null;
    }

    return progressCourse&&(
        <View>
            <SubHeading text={"In Progress"} color={Colors.BLACK} />

            <FlatList
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
