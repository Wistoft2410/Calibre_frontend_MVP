import 'react-native-get-random-values';
import React, {createContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {reducer, initialState} from './utils/reducer';
import {AuthContext} from './utils/authContext';
import { StyleSheet, View, Text, StatusBar, Button} from 'react-native';
import { supabase } from './utils/supabase';

import Feed from './screens/Feed';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Loading from './screens/Loading';

import { FeedStackScreen, AuthStackScreen, SignUpStackScreen } from './config/navigation';




export default function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                const { error } = await supabase.auth.signInWithPassword({
                    email: data.username,
                    password: data.password,
                });
                if (error) {
                    alert(error.message);
                }
                // On success, the onAuthStateChange listener below dispatches
                // RESTORE_SESSION and the app navigates itself.
            },
            signInApple: async identityToken => {
                const { error } = await supabase.auth.signInWithIdToken({
                    provider: 'apple',
                    token: identityToken,
                });
                if (error) {
                    alert(error.message);
                }
                return { error };
            },
            signOut: async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                    alert(error.message);
                }
            },
            signUP: async data => {
                const { data: signUpData, error } = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password,
                    options: {
                        // No `profiles` table exists yet (tracked separately in the
                        // migration checklist) — stash the collected fields as user
                        // metadata for now so they aren't lost.
                        data: {
                            bday: data.bday,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            language: data.language,
                            country: data.country,
                            city: data.city,
                            cityLat: data.cityLat,
                            cityLng: data.cityLng,
                            interests: data.interests,
                        },
                    },
                });
                if (error) {
                    alert(error.message);
                    return;
                }
                // Supabase returns a "success" response with no identities when the
                // email is already registered, instead of an error (enumeration protection).
                if (signUpData.user && signUpData.user.identities?.length === 0) {
                    alert('An account with this email already exists.');
                    return;
                }
                if (!signUpData.session) {
                    alert('Check your email to confirm your account before signing in.');
                }
                // If a session came back immediately (email confirmation disabled),
                // onAuthStateChange below picks it up and signs the user in.
            },
        }),
        []
    );


    React.useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            dispatch({ type: 'RESTORE_SESSION', session });
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            dispatch({ type: 'RESTORE_SESSION', session });
        });

        return () => subscription.unsubscribe();
    }, []);

    /*return ( 
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator>
                    {state.isLoading ? (
                    // We haven't finished checking for the token yet
                    <Stack.Screen name="Loading" component={Loading} />
                    ) : state.userToken == null ? (
                    // No token found, user isn't signed in
                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                        options={{
                        title: 'Sign in',
                    // When logging out, a pop animation feels intuitive
                        animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                        }}
                    />
                    ) : (
                    // User is signed in
                    <Stack.Screen name="Feed" component={Feed} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );*/

       
                      
    return ( 
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    {state.isLoading ? (
                         // We haven't finished checking for the token yet
                        <Loading />
                        ) : state.userToken == null ? (
                        // No token found, user isn't signed in
                        <AuthStackScreen />
                        ) : (
                        // User is signed in
                        <FeedStackScreen />
                        )
                    }
                </NavigationContainer>
            </AuthContext.Provider>
    );
}


