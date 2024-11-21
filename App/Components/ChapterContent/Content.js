import { View, Text, Dimensions, TouchableOpacity, Animated, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ProgressBar from './ProgressBar'
import { FlatList } from 'react-native-gesture-handler'
import ContentItem from './ContentItem'
import Colors from '../../Utils/Colors'
import { useNavigation } from '@react-navigation/native'

export default function Content({content, onChapterComplete}) {
  let contendRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const onNextBtnPress = (index) => {
    if(content?.length <= index + 1){
      onChapterComplete();
      navigation.goBack();
      return;
    }
    setActiveIndex(index + 1);
    contendRef.scrollToIndex({animated : true,index : index + 1});
  }

  return(
    <View style = {{padding : 0, height :'100%'}}>
        <ProgressBar 
        contentLength = {content?.length}
        contentIndex = {activeIndex}
         />

         <FlatList
          data = {content}
          horizontal = {true}
          pagingEnabled = {true}
          showsHorizontalScrollIndicator = {false}
          keyExtractor={(item, index) => index.toString()}
          ref={(ref) => { contendRef = ref}}
          renderItem={({item, index}) => (
            <ScrollView style = {{width: Dimensions.get('screen').width , padding : 20}}>
               <Text style = {{
                  fontFamily : 'outfit-semibold',
                  fontSize : 22,
                  marginTop : 5
               }}>{item.header}</Text>
               <ContentItem 
               description = {item?.description[0]?.html} 
               output = {item?.output[0]?.html}
               />
               <TouchableOpacity
                style = {{
                  marginBottom : 30,
                  borderRadius : 10,
                  overflow: 'hidden'
                }}
                onPress = {() => onNextBtnPress(index)}
               >
                 <Text style ={{
                  padding : 15,
                  backgroundColor : Colors.PRIMARY,
                  borderRadius : 10,
                  textAlign : 'center',
                  color : Colors.WHITE,
                  fontFamily : 'outfit-regular',
                  fontSize : 18,
                 }} >
                   {
                    content?.length <= index + 1 ? 'Finish' : 'Next'
                   }
                 </Text>
               </TouchableOpacity>
            </ScrollView>
          )}
         />
    </View>
  )
}