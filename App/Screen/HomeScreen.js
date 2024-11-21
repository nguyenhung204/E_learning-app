import { View, ScrollView } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Header from '../Components/HomeScreen/Header'
import Colors from '../Utils/Colors'
import Courses from '../Components/HomeScreen/Courses'
import { createNewUser } from '../Services/services'
import { useUser } from '@clerk/clerk-expo'
import CourseProgress from '../Components/HomeScreen/CourseProgress'
import { getUserDetail } from '../Services/services'
import { UserPointsContext } from '../Context/UserPointsContext'

export default function HomeScreen() {
  const {user} = useUser();
  const {setUserPoints} = useContext(UserPointsContext);

  useEffect(() => {
    const createUser = () => {
      if (user) {
        createNewUser(user.primaryEmailAddress.emailAddress, user.fullName, user.imageUrl)
          .then((response) => {
            if (response && response.userDetail?.point) {
              setUserPoints(response.userDetail?.point);
            }
          });
      }
    };
    if (user) {
      createUser();
    }
  }, [user, setUserPoints]);


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const response = await getUserDetail(user.primaryEmailAddress.emailAddress);
          if (response && response.userDetail) {
            setUserPoints(response.userDetail.point);
            console.log('User Points Set:', response.userDetail.point);
          }
        } catch (error) {
          console.error('Failed to fetch user details:', error);
        }
      }
    };
    fetchUserDetails();
    console.log('User 3:', user);
  }, [user]);



  return (
    <ScrollView>
      <View style={{ backgroundColor: Colors.PRIMARY, height: 250, padding: 20 }}>
        <Header />
      </View>
      <View>
        <View style = {{marginTop : -80}}>
          <CourseProgress />
        <Courses level={'Basic'}  />
        </View>
        <Courses level={'Advance'}  />
      </View>
    </ScrollView>
  )
}