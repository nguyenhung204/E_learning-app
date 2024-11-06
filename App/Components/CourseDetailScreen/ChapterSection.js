import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({ chapterList, enrolledCourse }) {

  const navigator = useNavigation();

  console.log(enrolledCourse[0]?.completedChapter)
  const OnChapterPress = (chapter) => {
    if (enrolledCourse.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Enroll Course !!!',
        text2: 'You need to enroll first to access the chapter'
      })
    }
    else {
      navigator.navigate('ChapterContent', {
        content: chapter.content,
        chapterId: chapter.id,
        userCourseRecordId: enrolledCourse[0].id
      })
    }
  }

  //d

  const isEnrolled = enrolledCourse.length > 0;

  const isChapterCompleted =(chapterId) =>{
    if(enrolledCourse[0]?.completedChapter?.length <= 0)
    {
        return false;
    }
    const resp = enrolledCourse[0].completedChapter.find(
      item => item.chapterId == chapterId
    )
    return resp;
  }

  // const color = isEnrolled ? (isChapterCompleted(item.chapterId) ? Colors.GREEN : Colors.PRIMARY) : Colors.GRAY
  return chapterList && (
    
    <View style={{
      padding: 10,
      backgroundColor: Colors.WHITE,
      borderRadius: 10,
      marginTop: 15
    }}>
      <Text style={{
        fontFamily: 'outfit-semibold',
        fontSize: 22,
        color: Colors.GRAY
      }}>Chapters</Text>
      {chapterList.map((chapter, index) => (
        <TouchableOpacity
          onPress={() => OnChapterPress(chapter)}
          style={[{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: isEnrolled ?  Colors.PRIMARY : Colors.GRAY,
            marginTop: 10
          }]}
          key={index}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
          }}>
            <Text style={{
              fontFamily: 'outfit-semibold',
              fontSize: 27,
              color: isEnrolled ?  Colors.PRIMARY : Colors.GRAY,
            }}>{index + 1}</Text>
            <Text style={{
              fontFamily: 'outfit-regular',
              fontSize: 21,
              color: isEnrolled ?  Colors.PRIMARY : Colors.GRAY,
            }}>{chapter.title}</Text>
          </View>

          {enrolledCourse.length == 0 ?
            <Ionicons name="lock-closed" size={25} color={Colors.GRAY} />
            :
            <Ionicons name="play-circle" size={25} color={Colors.PRIMARY} />
          }
        </TouchableOpacity>
      ))}
    </View>
  )
}