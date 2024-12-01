import { View, Text, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllUser } from './../Services/services';
import Colors from '../Utils/Colors';
import Gold from '../../assets/images/Gold.png';
import Silver from '../../assets/images/Silver.png';
import Bronze from '../../assets/images/Bronze.png';
import { useUser } from '@clerk/clerk-expo';

export default function LeaderBoard() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getAllUserDetail();
  }, [user]);

  const getAllUserDetail = () => {
    getAllUser().then((response) => {
      response && setUserList(response.userDetails);
    });
  };

  return (
    <View>
      <View style={{
        height: 160,
        backgroundColor: Colors.PRIMARY,
        padding: 30
      }}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'outfit-bold',
          color: Colors.WHITE,
          textAlign: 'center',
        }}>
          LeaderBoard
        </Text>
      </View>
      <View style = {{ marginTop : -40, }}>
      <FlatList
        data={userList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding : 20,
            backgroundColor : Colors.WHITE,
            margin : 10,
            marginLeft : 15,
            marginRight : 15,
            borderRadius : 15
          }}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
            }}>

              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 24,
                color: Colors.GRAY


              }}>{index + 1}</Text>
              <Image source={{ uri: item.profileImage }} style={{
                width: 60,
                height: 60,
                borderRadius: 50,
              }} />
              <View style={{
                justifyContent: 'center',
                // alignItems: 'center'
              }}>
                <Text style={{
                  fontFamily: 'outfit-semibold',
                  fontSize: 20
                }}>{item.userName}</Text>
                <Text style={{
                  color: Colors.GRAY,
                  fontFamily: 'outfit-regular',
                  fontSize: 16
                }}>{item.point} Points</Text>
              </View>

            </View>

            {index < 3 ?

              <Image source={index + 1 == 1 ? Gold
                : index + 1 == 2 ? Silver : Bronze}
                style={{
                  width: 40,
                  height: 40,
                }}
              /> : null}
          </View>)} />
      </View>
    </View>
  );
}

