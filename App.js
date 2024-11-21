import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { StyleSheet, View } from 'react-native';
import LoginScreen from './App/Screen/LoginScreen';
import Constant from './App/Utils/Constant';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './App/Navigations/TabsNavigation';
import Toast from 'react-native-toast-message';
import { useRef, useState, useMemo} from 'react';
import { CompleteChapterContext } from './App/Context/CompleteChapterContext';
import { UserPointsContext } from './App/Context/UserPointsContext';
export default function App() {

  const [isChapterComplete, setIsChapterComplete] = useState(false);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  const [fontsloaded] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  const toastRef = useRef();

  if (!fontsloaded) {
    return null; // or a loading spinner
  }

  // const userPointsContextValue = useMemo(() => ({
  //   userPoints,
  //   setUserPoints,
  // }), [userPoints]);

  return (
    <ClerkProvider publishableKey={Constant.ClerkKey}>
     <UserPointsContext.Provider value={{ userPoints,setUserPoints}}>
      <CompleteChapterContext.Provider value={{
         isChapterComplete, 
         setIsChapterComplete,
         completedChapters,
         setCompletedChapters
      }}>
      <View style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabsNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
        <Toast forwardRef={toastRef} />
      </View>
      </CompleteChapterContext.Provider>
    </UserPointsContext.Provider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
});