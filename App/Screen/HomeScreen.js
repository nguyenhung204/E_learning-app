import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import Courses from '../Components/HomeScreen/Courses'
import { createNewUser, getUserDetail } from '../Services/services'
import { UserPointsContext } from '../Context/UserPointsContext'
import { useUser } from '@clerk/clerk-expo'

export default function HomeScreen() {
  const {user} = useUser();
  const {userPoints, setUserPoints} = useContext(UserPointsContext);

  useEffect(() =>{
    user&&createUser();
  },[user])

  const createUser = () => {
    if(user)
    {
      createNewUser(user.primaryEmailAddress.emailAddress, user.fullName, user.imageUrl)
      .then((response) => {
        if(response){
          setUserPoints(response.userDetail?.point);
        }
      })
    }
  }

  const GetUser = () => {
    getUserDetail(user.primaryEmailAddress.emailAddress)
      .then((response) => {
        setUserPoints(response.userDetail?.point);
      })
    }
  return (
    <View>
      <View style={{ backgroundColor: Colors.PRIMARY, height: 250, padding: 20 }}>
        <Header />
      </View>
      <View style = {{padding : 20}}>
        <View style = {{marginTop : -80}}>
        <Courses level={'Basic'}  />
        </View>
        <Courses level={'Advance'}  />
      </View>
    </View>
  )
}