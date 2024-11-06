
import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react'
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CourseItem({item}) {
  return (
    <View style={{
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 20,
    }}>
        <Image source={{ uri: item.banner?.url }}
            style={{ width: 210, height: 120, borderRadius: 15 }}
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
                        {item.chapter.content?.length} Chapters
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
    </View>
  )
}
const styles = StyleSheet.create({
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})