import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCourseList } from '../../Services/services';
import SubHeading from './../SubHeading';
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Courses({ level }) {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        getCourse();
    }, []);

    const getCourse = () => {
        getCourseList(level).then((res) => {
            console.log('Courses', res);
            setCourseList(res?.courses);
        }).catch((err) => {
            console.log(err);
        });
    };

    return (
        <View>
            <SubHeading text={'Basic Course'} />
            <FlatList
                data={courseList}
                key={courseList?.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{
                        padding: 10,
                        backgroundColor: Colors.WHITE,
                        borderRadius: 15,
                        marginTop: 10,
                        marginBottom: 20,
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
                                        {item?.time} Hours
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
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }

})
