import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'

export default function SubHeading({text, color = Colors.BLACK}) {
  return (
    <View>
        <Text style={{
                fontSize: 24,
                fontFamily: 'outfit-bold',
                color: color,
            }}>{text}</Text>
    </View>
  )
}