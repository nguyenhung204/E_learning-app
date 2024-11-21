import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { useWarmUpBrowser } from '../../hooks/warmUpBrowser'


WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser()

    const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

    const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/dashboard', { scheme: 'learning' }),
        });
  
        if (createdSessionId) {
          if (setActive) {
            setActive({ session: createdSessionId });
          }
        } else {
          if (signIn) {
            signIn();
          } else if (signUp) {
            signUp();
          }
        }
      } catch (err) {
        console.error('OAuth error', err);
      }
    }, []);

    return (
        <View style={{ display: 'flex', alignItems: "center" }}>

            <Image source={require('../../assets/images/app.png')}
                style={{ width: 350, height: 500, marginTop:20, objectFit: 'cover', borderRadius: 50,overflow: 'hidden' }} />
            <View
                style={{
                    height: 500,
                    backgroundColor: Colors.PRIMARY,
                    width: '100%',
                    marginTop: -100,
                    padding: 20,
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 35,
                        color: Colors.WHITE,
                        fontFamily: 'outfit-bold',
                        marginTop: 30

                    }}>CODEBOX</Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        color: Colors.LIGHT_PRIMARY,
                        fontFamily: 'outfit-regular',
                        marginTop: 20
                    }}>Your Ultimate Programming Learning Box</Text>
                <TouchableOpacity onPress={onPress}
                    style={{
                        backgroundColor: Colors.WHITE,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        padding: 10,
                        borderRadius: 99,
                        marginTop: 25,
                    }}>
                    <Image source={require('../../assets/images/gg.png')}
                        style={{ height: 40, width: 40 }} />
                    <Text>
                        Sign in with Google
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}