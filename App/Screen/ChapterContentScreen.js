import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services/services'
import Toast from 'react-native-toast-message'
import { CompleteChapterContext } from '../Context/CompleteChapterContext'
import { useUser } from '@clerk/clerk-expo'
import { UserPointsContext } from '../Context/UserPointsContext'

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const { setIsChapterComplete, setCompletedChapters } = useContext(CompleteChapterContext);
  const {user} = useUser();
  const {userPoints, setUserPoints} = useContext(UserPointsContext);

  useEffect(() => {
    console.log("ChapterID", param.chapterId);
    console.log('RecordId',param.userCourseRecordId )
    }, [param])

    const onChapterCompleted = async() => {
      const contentLength = param.content?.length;
      const points = Number(userPoints);
      const totalPoints = points + contentLength * 10;
      
      if (Number.isNaN(totalPoints)) {
        console.error('Total points calculation resulted in NaN');
        return;
      }
      // Optimistic update
      setIsChapterComplete(true);
      setCompletedChapters(prev => [...prev, param.chapterId]);
      setUserPoints(totalPoints);
  
      // API call
      await MarkChapterCompleted(
        param.chapterId,
        param.userCourseRecordId, 
        user.primaryEmailAddress.emailAddress, 
        totalPoints
      ).then(resp => {
        if(resp) {
          Toast.show({
            type: 'success',
            text1: 'Congratulation !!!',
            text2: 'You completed this chapter !!! '
          });
        }
      }).catch(error => {
        console.error('Failed to mark chapter as completed', error);
        setIsChapterComplete(false);
        setCompletedChapters(prev => prev.filter(id => id !== param.chapterId));
        setUserPoints(points);
        Toast.show({
          type: 'error',
          text1: 'Failed to mark chapter as completed',
          text2: 'Please try again'
        });
      });
    };


  return (
    <View>
      <Content 
      content = {param.content}
      onChapterComplete = {() =>onChapterCompleted() }
      />
    </View>
  )
}