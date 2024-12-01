import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { getProgressCourse } from '../Services/services';
import CourseProgressItem from '../Components/MyCourses/CourseProgressItem';

export default function MyCourses() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [progressCourse, setProgressCourse] = useState([]);

  useEffect(() => {
    if (user) {
      getProgressUserCourse();
    }
  }, [user]);

  const getProgressUserCourse = () => {
    getProgressCourse(user.primaryEmailAddress.emailAddress).then(resp => {
      console.log(resp.userConrolledCourses);
      setProgressCourse(resp.userConrolledCourses);
    });
  };

  return (
    <View style ={{marginBottom : 200}}>
      <View style={{
        height: 160,
        backgroundColor: Colors.PRIMARY,
        padding: 30
      }}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          color: Colors.WHITE,
          textAlign: 'center',
        }}>
          My Course
        </Text>
      </View>

      <FlatList
        data={progressCourse}
        style={{
          marginTop: -50
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              margin: 10,
              padding: 5,
            }}
            onPress={() => {
              navigation.navigate('CourseDetail', {
                course: item.course,
              });
            }}
          >
            <CourseProgressItem item={item.course} completedChapter={item?.completedChapter?.length} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}