import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  return isLoaded && (
    <View>
      <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>
        <View style={styles.rowStyle}>
          <Image source={{ uri: user?.imageUrl }}
            style={{ width: 50, height: 50, borderRadius: 99 }} />
          <View >
            <Text
              style={{ color: Colors.WHITE, fontFamily: 'outfit-regular' }}>
              Welcome </Text>
            <Text
              style={styles.mainText}>
              {user?.fullName} </Text>
          </View>
        </View>

        <View style={styles.rowStyle}>
          <Image source={require('../../../assets/images/coin.png')}
            style={{ width: 40, height: 40 }}
          />
          <Text style={[styles.mainText, { marginTop: 10 }]}>5000</Text>
        </View>
      </View>
      <View style ={styles.inputStyle}>
         <TextInput placeholder='Search Courses' style ={{fontFamily: 'outfit-regular', fontSize :18, marginLeft : 10}}/>
         <Ionicons name="search-circle" size={40} color={Colors.PRIMARY} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  mainText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'outfit-regular'
  },
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  inputStyle: {
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginRight: 5,
    marginTop: 20,
    padding: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  }
})
