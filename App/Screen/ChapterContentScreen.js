import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services/services'
import Toast from 'react-native-toast-message'
import { CompleteChapterContext } from '../Context/CompleteChapterContext'
import { useUser } from '@clerk/clerk-expo'
import { UserPointsContext } from '../Context/UserPointsContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

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

      const tempCompletion = {
        chapterId: param.chapterId,
        userCourseRecordId: param.userCourseRecordId,
        completedAt: new Date().toISOString(),
        points: totalPoints
      };
      try {

         // Save to cache first
      await AsyncStorage.setItem(
        `chapter-completion-${param.chapterId}`,
        JSON.stringify(tempCompletion)
      );

      // Optimistic update
      setIsChapterComplete(true);
      setCompletedChapters(prev => [...prev, param.chapterId]);
      setUserPoints(totalPoints);

      Toast.show({
        type: 'success',
        text1: 'Congratulation !!!',
        text2: 'You completed this chapter !!! '
      });
      
      
      // Then push to server
      await MarkChapterCompleted(
        param.chapterId,
        param.userCourseRecordId,
        user.primaryEmailAddress.emailAddress,
        totalPoints
      );
     
      } catch( error ) {
        await AsyncStorage.removeItem(`chapter-completion-${param.chapterId}`);
        setIsChapterComplete(false);
        setCompletedChapters(prev => prev.filter(id => id !== param.chapterId));
        setUserPoints(points);
        Toast.show({
          type: 'error',
          text1: 'Failed to mark chapter as completed', 
          text2: 'Please try again'
        });
      };
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