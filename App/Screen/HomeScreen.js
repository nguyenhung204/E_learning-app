import { View, Text } from 'react-native'
import React from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import Courses from '../Components/HomeScreen/Courses'

export default function HomeScreen() {
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