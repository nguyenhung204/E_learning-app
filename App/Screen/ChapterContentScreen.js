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
  const { isChapterComplete, setIsChapterComplete} = useContext(CompleteChapterContext);
  const {user} = useUser();
  const {userPoints, setUserPoints} = useContext(UserPointsContext);

  useEffect(() => {
    console.log("ChapterID", param.chapterId);
    console.log('RecordId',param.userCourseRecordId )
    }, [param])

  const onChapterCompleted = ()=>{
    const totalPoints = Number(userPoints) + param.content?.length*10;
    MarkChapterCompleted(param.chapterId,param.userCourseRecordId, 
      user.primaryEmailAddress.emailAddress, totalPoints).then(resp => {
      
      if(resp){
        Toast.show({
          type : 'success',
          text1 : 'Congratulation !!!',
          text2 : 'You completed this chapter !!! '
        })
        setIsChapterComplete(true);
      }
    })
  }

  return param.content&&(
    <View>
      <Content 
      content = {param.content}
      onChapterComplete = {() =>onChapterCompleted() }
      />
    </View>
  )
}