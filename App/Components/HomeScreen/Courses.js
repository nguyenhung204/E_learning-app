import { View,FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCourseList } from '../../Services/services';
import SubHeading from './../SubHeading';
import Colors from '../../Utils/Colors';
import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function Courses({ level }) {
    const [courseList, setCourseList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = () => {
        getCourseList(level).then((res) => {
            console.log('Courses', res);
            setCourseList(res?.courses);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <View>
            <SubHeading text={level + ' Course'} color={Colors.BLACK} />
            <FlatList
                data={courseList}
                key={courseList?.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => {navigation.navigate('CourseDetail', {
                        course : item
                    })}}>
                        <CourseItem item={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}


