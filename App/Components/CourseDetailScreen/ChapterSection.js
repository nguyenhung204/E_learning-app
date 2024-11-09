import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../Utils/Colors';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({ chapterList, enrolledCourse }) {
  const navigator = useNavigation();
  const { isChapterComplete, setIsChapterComplete} = useContext(CompleteChapterContext);

  const OnChapterPress = (chapter) => {
    if (enrolledCourse.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Enroll Course !!!',
        text2: 'You need to enroll first to access the chapter'
      })
    }
    else {
      setIsChapterComplete(false);
      navigator.navigate('ChapterContent', {
        content: chapter.content,
        chapterId: chapter.id,
        userCourseRecordId: enrolledCourse[0].id
      })
    }
  }


  const isEnrolled = enrolledCourse.length > 0;

  const isChapterCompleted = (chapterId) => {
    if (!isEnrolled || !enrolledCourse[0]?.completedChapter) {
      return false;
    }
    const resp = enrolledCourse[0]?.completedChapter.find(
      item => item.chapterId === chapterId
    );
    return !!resp;
  };


  const getColor = (chapterId) => {
    if (isEnrolled && isChapterCompleted(chapterId)) {
      return Colors.GREEN;
    } else if (isEnrolled) {
      return Colors.PRIMARY;
    } else {
      return Colors.GRAY;
    }
  };
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
            borderColor: getColor(chapter.id),
            marginTop: 10,
          }]}
          key={index}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center'
          }}>
            {isChapterCompleted(chapter.id) ? <Ionicons name="checkmark-circle" size={25} color={Colors.GREEN} />
            :<Text style={{
              fontFamily: 'outfit-semibold',
              fontSize: 27,
              color: getColor(chapter.id),
            }}>{index + 1}</Text>}
            <Text style={{
              fontFamily: 'outfit-regular',
              fontSize: 21,
              color: getColor(chapter.id),
            }}>{chapter.title}</Text>
          </View>

          {enrolledCourse.length == 0 ?
            <Ionicons name="lock-closed" size={25} color={getColor(chapter.id)} />
            :
            <Ionicons name="play-circle" size={25} color={getColor(chapter.id)} />
          }
        </TouchableOpacity>
      ))}
    </View>
  )
}