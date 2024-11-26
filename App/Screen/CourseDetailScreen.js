import { TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { ScrollView } from 'react-native-gesture-handler';
import { enrollCourse, getUserEnrolledCourses } from '../Services/services';
import { useUser } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      setLoading(true);
      try {
        const courses = await getUserEnrolledCourses(params.course.id, user.primaryEmailAddress.emailAddress);
        setEnrolledCourse(courses.userConrolledCourses);
      } catch (error) {
        console.error('Fetch enrolled courses error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [params.course, user]);

  const UserEnrollCourse = async () => {
    setLoading(true);

    const tempEnrollment = {
      id: `temp-${Date.now()}`,
      courseId: params.course.id,
      userEmail: user.primaryEmailAddress.emailAddress,
      completedChapter: []
    };

    try {

      await AsyncStorage.setItem(
        `enrolled-course-${params.course.id}`,
        JSON.stringify(tempEnrollment)
      );

      setEnrolledCourse(prev => [...prev, tempEnrollment]);

      Toast.show({
        text1: 'Course Enrolled Successfully',
        text2: 'You have successfully enrolled the course',
        type: 'success'
      });

       // Then push to server
      const response = await enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress);
      
      if (response) {
        // Update cache with server response
        await AsyncStorage.setItem(
          `enrolled-course-${params.course.id}`,
          JSON.stringify(response)
        );
      }
    } catch (error) {
      await AsyncStorage.removeItem(`enrolled-course-${params.course.id}`);

      setEnrolledCourse(prev => 
        prev.filter(course => course.id !== tempEnrollment.id)
      );
      
      Toast.show({
        text1: 'Error',
        text2: 'Failed to enroll in course',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  

  return params.course && (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color={Colors.BLACK} />
      </TouchableOpacity>
      <DetailSection 
      enrolledCourse = {enrolledCourse}
      course={params.course} 
      enrollCourse={() => UserEnrollCourse()}
      loading={loading} />
      <ChapterSection 
      enrolledCourse = {enrolledCourse}
      chapterList = {params.course.chapter}/>
    </ScrollView>
  )
}