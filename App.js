import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import HomeScreen from './Home';
import ProfileScreen from './Profile';
import FeedScreen from './FeedScreen';
import DanceSettings from './DanceSettings';
import SignUpScreen from './SignUpScreen';

const Stack = createStackNavigator();

// removing animations while  scrolling
const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  animationEnabled: false,
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 0 } },
    close: { animation: 'timing', config: { duration: 0 } },
  },
  cardStyleInterpolator: () => ({ cardStyle: { opacity: 1 } }),
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="DanceSettings" component={DanceSettings} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

