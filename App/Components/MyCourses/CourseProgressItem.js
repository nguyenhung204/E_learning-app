import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import ProgressBarCourse from '../HomeScreen/ProgressBarCourse';
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const CourseProgressItem = ({item, completedChapter}) => {
    return (
      <ScrollView style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          borderRadius: 15,
          marginBottom: 10,
          marginRight: 20,
          width : '100%'
      }}>
          <Image source={{ uri: item.banner?.url }}
              style={{ width: "100%", height: 200, borderRadius: 15 }}
          />
          <View style={{padding : 10}}>
              <Text style={{
                  fontFamily: 'outfit-semibold',
                  fontSize: 17,
              }}>
                  {item.name}
              </Text>
              <View style={styles.contentContainer}>
                  <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      marginTop: 5
                  }}>
                      <Ionicons name="book-outline" size={18} color="black" />
                      <Text style = {{fontFamily :'outfit-regular'}}>
                          {item.chapter?.length} Chapters
                      </Text>
                  </View>
                  <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 5,
                      alignItems: 'center',
                      marginTop: 5
                  }}>
                      <Ionicons name="time-outline" size={18} color="black" />
                      <Text style = {{fontFamily :'outfit-regular'}}>
                          {item?.time + " Hr"}
                      </Text>
                  </View>
              </View>
              <Text
              style = {{
                  marginTop : 10,
                  color : Colors.PRIMARY,
                  fontFamily : 'outfit-semibold',
              }}
              >{item.price == 0 ? "Free" : item.price}</Text>
          </View>
         { completedChapter.length !== undefined ? <ProgressBarCourse
              totalChapter = {item?.chapter?.length}
              completedChapter = {completedChapter}
           /> : null}
      </ScrollView>
    )
  }
  const styles = StyleSheet.create({
      contentContainer: {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
      }
  })
export default CourseProgressItem;  