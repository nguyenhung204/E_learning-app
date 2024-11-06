import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Content from '../Components/ChapterContent/Content'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MarkChapterCompleted } from '../Services/services'
import Toast from 'react-native-toast-message'

export default function ChapterContentScreen() {
  const param = useRoute().params
  const navigation  = useNavigation();

  useEffect(() => {
    console.log("ChapterID", param.chapterId);
    console.log('RecordId',param.userCourseRecordId )
    }, [param])

  const onChapterCompleted = ()=>{
    MarkChapterCompleted(param.chapterId,param.userCourseRecordId ).then(resp => {
      if(resp){
        Toast.show({
          type : 'success',
          text1 : 'Congratulation !!!',
          text2 : 'You completed this chapter !!! '
        })
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