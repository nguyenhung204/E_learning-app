import { useFonts } from 'expo-font';
import { ClerkProvider, SignedIn, SignedOut} from '@clerk/clerk-expo'
import { StyleSheet, View, Text } from 'react-native';
import LoginScreen from './App/Screen/LoginScreen';
import Constant from './App/Utils/Constant';
import { NativeScreenContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './App/Navigations/TabsNavigation';

export default function App() {
  const [fontsloaded] = useFonts({
    'outfit-regular': require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-light': require('./assets/fonts/Outfit-Light.ttf'),
    'outfit-semibold': require('./assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
 
  });
  return (
    <ClerkProvider publishableKey={Constant.ClerkKey}>
    <View style={styles.container}>
      
      <SignedIn>
        <NavigationContainer>
          <TabsNavigation/>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
      <LoginScreen />
      </SignedOut>
    </View>
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
