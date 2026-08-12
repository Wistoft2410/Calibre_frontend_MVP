import React from 'react';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



import Start from '../screens/Start';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Message from "../screens/Message";
import Menu from "../components/Menu";
import meetUpMap from "../screens/flows/meetUpMap/Map";
import EditProfile from "../screens/editProfile";
import EditName from "../screens/flows/editProfile/Name";
import EditEmail from "../screens/flows/editProfile/Email";
import EditPhone from "../screens/flows/editProfile/Phone";
import EditCity from "../screens/flows/editProfile/City";
import EditGender from "../screens/flows/editProfile/Gender";
import EditPassword from "../screens/flows/editProfile/Password";
import EditAge from "../screens/flows/editProfile/Age";
import EditProfileImage from "../screens/flows/editProfile/ProfileImage";
import UserCard from "../screens/userCard";

// New sign up flow

import Age from '../screens/flows/newSignUpFlow/age';
import Animation1 from '../screens/flows/newSignUpFlow/animation1';
import Animation2 from '../screens/flows/newSignUpFlow/animation2';
import City from '../screens/flows/newSignUpFlow/city';
import Email from '../screens/flows/newSignUpFlow/email';
import Name from '../screens/flows/newSignUpFlow/name';
import Password from '../screens/flows/newSignUpFlow/password';
import TheDeal from '../screens/flows/newSignUpFlow/theDeal';
import Interest from '../screens/flows/newSignUpFlow/Interest';

// Apple sign up flow

import AppleAge from '../screens/flows/appleSignUpFlow/age';
import AppleCity from '../screens/flows/appleSignUpFlow/city';
import AppleInterest from '../screens/flows/appleSignUpFlow/Interest';



const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const noFade = () => ({
  cardStyle: {
    opacity: 1,
  },
});

const StackNavigatorConfig = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
}

export const verticalAnimationMessages = {
  gestureDirection: 'vertical',
  headerShown: false, animationEnabled: true, gestureEnabled: true,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        opacity: current.progress,
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};


const FeedStack =  createStackNavigator();
export const FeedStackScreen = () => (
      <FeedStack.Navigator initialRouteName="Menu" 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#094527',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 18
          },
        }}
        >
        <FeedStack.Screen name="Menu" component={Menu} options={{headerShown: false,animationEnabled: false, gestureEnabled:false}} />
        <FeedStack.Screen name="Map" component={meetUpMap} options={verticalAnimationMessages} />
        <FeedStack.Screen name="Message"  component={Message} options={verticalAnimationMessages} />
        <FeedStack.Screen name="editProfile"  component={EditProfile} options={{headerShown: true,animationEnabled: true, gestureEnabled:true, title: 'Edit Profile'}} />
        <FeedStack.Screen name="editName"  component={EditName} options={{headerShown: false,animationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editEmail"  component={EditEmail} options={{headerShown: false,animationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editPhone"  component={EditPhone} options={{headerShown: false,animationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editCity"  component={EditCity} options={{headerShown: false,animanimationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editGender"  component={EditGender} options={{headerShown: false,animanimationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editPassword"  component={EditPassword} options={{headerShown: false,animanimationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editAge"  component={EditAge} options={{headerShown: false,animanimationEnabled: true, gestureEnabled:true, }} />
        <FeedStack.Screen name="editProfileImage"  component={EditProfileImage} options={{headerShown: false,animanimationEnabled: true, gestureEnabled:true, }} />
      </FeedStack.Navigator>
);
// options={({ route }) => ({ title: route.params.userToName})}
const AuthStack = createStackNavigator();
export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Start" component={Start} options={{headerShown: false}}/>
    <AuthStack.Screen name="Sign in" component={SignIn} options={{headerShown: false}, verticalAnimationMessages}/>
    <AuthStack.Screen 
    options={{
      headerShown: false,
      cardStyleInterpolator: forFade,
      gestureEnabled: true,
      gestureDirection: 'horizontal',
    }} 
    name="Sign up"
    component={SignUpStackScreen}/>
    <AuthStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Age" component={AppleAge} />
    <AuthStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="City" component={AppleCity} />
    <AuthStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Interest" component={AppleInterest} />
 
  </AuthStack.Navigator>
);



const SignUpStack = createStackNavigator();
export const SignUpStackScreen = () => (
  <SignUpStack.Navigator >
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="animation" component={Animation1} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="animation2" component={Animation2} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="The Deal" component={TheDeal} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Age" component={Age} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Email" component={Email} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Name" component={Name} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="City" component={City} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Password" component={Password} />
    <SignUpStack.Screen options={{cardStyleInterpolator: noFade, headerShown: false}}  name="Interest" component={Interest} />
  </SignUpStack.Navigator>
);

