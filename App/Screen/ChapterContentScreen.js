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
  


  return (
    <View>
      <Content 
      content = {param.content}
      onChapterComplete = {() =>onChapterCompleted() }
      />
    </View>
  )
}