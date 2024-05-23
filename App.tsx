import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";

import History from "./screens/History";

import { GLOBAL_COLORS } from "./constants/Colors";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProvider, useNavigationContext } from "./store/navigationContext";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FirebaseProvider, useFirebase } from "./store/firebaseContext";

//import { LogBox } from 'react-native'; // Import LogBox
//LogBox.ignoreLogs(['Setting a timer']); // Ignore the warning log

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
  return <Stack.Navigator
  >
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='Signup' component={Signup} />
  </Stack.Navigator>
}

const AuthenticatedStack = () => {
  const {hideTabBar} = useNavigationContext();

  return <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: GLOBAL_COLORS.primary
      },
      headerShown: !hideTabBar,
      headerTintColor: GLOBAL_COLORS.white,
      tabBarStyle: {
        display: hideTabBar ? 'none' : undefined,
        backgroundColor: GLOBAL_COLORS.primary
      },
      tabBarActiveTintColor: GLOBAL_COLORS.accent,
      tabBarInactiveTintColor: GLOBAL_COLORS.white,
    }}>
    <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
            name="meditation"
            size={36}
            color={color} />
        )
    }}

    />
    <Tab.Screen
      name='History'
      component={History}
      options={{
        tabBarIcon: ({focused, color}) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={24}
              color={color} />
          )
      }}
    />
  </Tab.Navigator>
}

const Root = () => {
  const {user} = useFirebase();

  console.log(user)

  return (
    <NavigationProvider>
      <NavigationContainer>
        {!user && <AuthStack/>}
        {user && <AuthenticatedStack/>}
      </NavigationContainer>
    </NavigationProvider>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FirebaseProvider>
        <Root/>
      </FirebaseProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
