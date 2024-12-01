import { View, Text, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserPointsContext } from '../../Context/UserPointsContext';
import { useNavigation } from '@react-navigation/native';
import { getCourseList } from '../../Services/services';
 

export default function Header() {
  const { userPoints } = useContext(UserPointsContext);
  const { isLoaded, user } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch all courses when component mounts
    const fetchCourses = async () => {
      try {
        const basicCourses = await getCourseList('Basic');
        const advanceCourses = await getCourseList('Advance');
        setCourses([
          ...(basicCourses?.courses || []),
          ...(advanceCourses?.courses || [])
        ]);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourses();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.length > 0) {
      const filtered = courses.filter(course =>
        course.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCourses(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredCourses([]);
      setShowSuggestions(false);
    }
  };

  const handleCourseSelect = (course) => {
    setSearchQuery('');
    setShowSuggestions(false);
    navigation.navigate('CourseDetail', { course });
  };


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
          {userPoints ?
          <Text style={[styles.mainText, { marginTop: 10 }]}>{userPoints}</Text>: null}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.inputStyle}>
          <TextInput
            placeholder='Search Courses'
            style={{ 
              fontFamily: 'outfit-regular', 
              fontSize: 18, 
              marginLeft: 10, 
              flex: 1, 
              borderWidth: 0,
              borderColor: 'transparent'
               }}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <Ionicons name="search-circle" size={40} color={Colors.PRIMARY} />
        </View>
        {showSuggestions && filteredCourses.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredCourses}
              keyExtractor={(item) => item.id}
              nestedScrollEnabled={true}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleCourseSelect(item)}
                >
                  <Text style={styles.suggestionText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
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
    placeholderTextColor: "#aaa"
  },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.WHITE,
    borderRadius: 25,
    marginTop: 5,
    elevation: 5,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000
  },
  suggestionItem: {
    padding: 15,
  },
  suggestionText: {
    fontFamily: 'outfit-regular',
    fontSize: 18,
    color : Colors.PRIMARY,
  },
})
