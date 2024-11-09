import { View, TouchableOpacity, ToastAndroid } from 'react-native'
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


export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const { isChapterComplete, setIsChapterComplete} = useContext(CompleteChapterContext);
  const {user} = useUser();

  useEffect(() => {
    console.log('CourseDetailScreen', params.course);
    if(user&&params.course){
      GetUserEnrolledCourse();
    }
  }, [params.course, user]);

  useEffect(() =>{
    isChapterComplete && GetUserEnrolledCourse();

  }, [isChapterComplete])

  const UserEnrollCourse = async () => {
     enrollCourse(params.course.id,user.primaryEmailAddress.emailAddress)
     .then((response)=>{
        if(response){
          Toast.show({
            text1: 'Course Enrolled Successfully',
            text2: 'You have successfully enrolled the course',
            type: 'success'
          });
          GetUserEnrolledCourse();
        }
     })
  }
  const GetUserEnrolledCourse = async() => {
    getUserEnrolledCourses(params.course.id,user.primaryEmailAddress.emailAddress)
    .then((response)=>{
      setEnrolledCourse(response.userConrolledCourses);
    })
  }
  return params.course && (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-circle" size={40} color={Colors.BLACK} />
      </TouchableOpacity>
      <DetailSection 
      enrolledCourse = {enrolledCourse}
      course={params.course} enrollCourse={() => UserEnrollCourse()} />
      <ChapterSection 
      enrolledCourse = {enrolledCourse}
      chapterList = {params.course.chapter}/>
    </ScrollView>
  )
}