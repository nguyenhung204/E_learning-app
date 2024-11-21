import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext } from 'react';
import Colors from '../Utils/Colors';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { UserPointsContext } from '../Context/UserPointsContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser();
  const { userPoints } = useContext(UserPointsContext);
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const handleSignOut = () => {
    signOut();
  };

  const menuItems = [
    {
      id: 1,
      name: 'My Courses',
      icon: 'book',
      action: () => navigation.navigate('My-course'),
      description: 'View your enrolled courses'
    },
    {
      id: 2,
      name: 'My Achievement',
      icon: 'trophy',
      count: userPoints,
      description: `Total points earned: ${userPoints}`,
    },
    {
      id: 3,
      name: 'LeaderBoard',
      icon: 'podium',
      action: () => navigation.navigate('Leader-board'),
      description: 'See where you rank'
    },
    {
      id: 4,
      name: 'Settings',
      icon: 'settings',
      // action: () => navigation.navigate('Settings'),
      description: 'App preferences'
    }
  ];

  return (
    <ScrollView style={{ flex: 1 }}>
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
          Profile
        </Text>
      </View>

      <View style={{ marginTop: -40, padding: 20 }}>
        {/* Profile Card */}
        <View style={{
          backgroundColor: Colors.WHITE,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15
        }}>
          <Image 
            source={{ uri: user?.imageUrl }} 
            style={{
              width: 100,
              height: 100,
              borderRadius: 50
            }}
          />
          <View>
            <Text style={{
              fontSize: 20,
              fontFamily: 'outfit-bold'
            }}>{user?.fullName}</Text>
            <Text style={{
              fontFamily: 'outfit-regular',
              color: Colors.GRAY,
              marginTop: 5
            }}>{user?.primaryEmailAddress.emailAddress}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={{
          backgroundColor: Colors.WHITE,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20
        }}>
          <Text style={{
            fontSize: 18,
            fontFamily: 'outfit-bold',
            marginBottom: 15
          }}>Your Stats</Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 10
          }}>
            <View style={{ alignItems: 'center' }}>
              <Image 
                source={require('../../assets/images/coin.png')}
                style={{ width: 40, height: 40 }}
              />
              <Text style={{
                fontFamily: 'outfit-regular',
                fontSize: 16,
                marginTop: 5
              }}>Points</Text>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                color: Colors.PRIMARY
              }}>{userPoints}</Text>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="book" size={40} color={Colors.PRIMARY} />
              <Text style={{
                fontFamily: 'outfit-regular',
                fontSize: 16,
                marginTop: 5
              }}>Courses</Text>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                color: Colors.PRIMARY
              }}>In Progress</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View style={{
          backgroundColor: Colors.WHITE,
          padding: 20,
          borderRadius: 15,
          marginBottom: 20
        }}>
          {menuItems.map(item => (
            <TouchableOpacity 
            key={item.id}
            style={{
              flexDirection: 'column',
              paddingVertical: 15,
              borderBottomWidth: 1,
              borderBottomColor: Colors.GRAY + '20',
            }}
            onPress={item.action}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <Ionicons name={item.icon} size={24} color={Colors.PRIMARY} />
              <View style={{ flex: 1, marginLeft: 15 }}>
                <Text style={{
                  fontFamily: 'outfit-regular',
                  fontSize: 16,
                }}>{item.name}</Text>
                <Text style={{
                  fontFamily: 'outfit-regular',
                  fontSize: 12,
                  color: Colors.GRAY
                }}>{item.description}</Text>
              </View>
              {item.count ? (
                <Text style={{
                  fontFamily: 'outfit-bold',
                  color: Colors.PRIMARY
                }}>{item.count}</Text>
              ) : (
                <Ionicons name="chevron-forward" size={24} color={Colors.GRAY} />
              )}
            </View>
          </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          onPress={handleSignOut}
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 15,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 20
          }}>
          <Ionicons name="log-out-outline" size={24} color={Colors.WHITE} />
          <Text style={{
            color: Colors.WHITE,
            fontFamily: 'outfit-bold',
            fontSize: 16
          }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}