import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OptionItem({ icon, value }) {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
            marginTop: 5
        }}>
            <Ionicons name={icon} size={18} color="black" />
            <Text style={{ fontFamily: 'outfit-regular' }}>
                {value}
            </Text>
        </View>
    )
}