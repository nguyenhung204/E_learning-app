import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'


export default function DetailSection({ course, enrollCourse, enrolledCourse }) {
  return (
    <View style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
      <Image source={{ uri: course?.banner?.url }} style={{
        width: Dimensions.get('screen').width * 0.86,
        height: 190,
        borderRadius: 15,
      }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 22, fontFamily: 'outfit-semibold', marginTop: 10 }}>{course.name}</Text>

        <View>
          <View style={styles.rowStyle}>
            <OptionItem icon={"book-outline"} value={course.chapter?.length + " Chapters"} />
            <OptionItem icon={"time-outline"} value={course.time + " Hours"} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem icon={"person-circle-outline"} value={course?.author} />
            <OptionItem icon={"cellular-outline"} value={course.level} />
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'outfit-semibold',
              marginTop: 10
            }}>Description</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'outfit-regular',
              marginTop: 5,
              color: Colors.GRAY,
              lineHeight: 25
            }}>{course.description[0].markdown}</Text>
        </View>
        <View style = {{
          display : 'flex',
          flexDirection : 'row',
          justifyContent : 'space-evenly',
          gap : 10,
          marginTop : 10
        }}>
          {enrolledCourse?.length == 0?<TouchableOpacity
            onPress = {()=>enrollCourse()}
            style={{
              padding: 15,
              backgroundColor: Colors.PRIMARY,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'outfit-regular',
                color: Colors.WHITE,
                textAlign: 'center',
                fontSize: 17
              }}
            >Enroll For Free</Text>
          </TouchableOpacity>:null}
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: Colors.SECONDARY,
              borderRadius: 15,
            }}>
            <Text
              style={{
                fontFamily: 'outfit-regular',
                color: Colors.WHITE,
                textAlign: 'center',
                fontSize: 17
              }}
            >Menbership $2.99/Mon</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
})
