import { TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../Utils/Colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import DetailSection from '../Components/CourseDetailScreen/DetailSection';
import ChapterSection from '../Components/CourseDetailScreen/ChapterSection';
import { ScrollView } from 'react-native-gesture-handler';
import { enrollCourse, getUserEnrolledCourses } from '../Services/services';
import { useUser } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';
import { CompleteChapterContext } from '../Context/CompleteChapterContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const { isChapterComplete, setIsChapterComplete } = useContext(CompleteChapterContext);
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
    try {
      const response = await enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress);
      if (response) {
        Toast.show({
          text1: 'Course Enrolled Successfully',
          text2: 'You have successfully enrolled the course',
          type: 'success'
        });
        // Update the enrolled courses state immediately
        setEnrolledCourse((prevCourses) => [
          ...prevCourses,
          { id: params.course.id, courseId: params.course.id, completedChapter: [] }
        ]);
      }
    } catch (error) {
      console.error('Enrollment error:', error);
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