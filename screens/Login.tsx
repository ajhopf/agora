import React from "react";
import { View, Text, Button } from "react-native";
import AgoraButton from '../components/UI/AgoraButton'
import auth from '@react-native-firebase/auth';
import { GLOBAL_COLORS } from "../constants/Colors";

const Login = () => {

  const authenticate = () => {
    console.log('click')
    auth()
      .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

 return <>
   <Text>Login</Text>
   <Button title={'Auth'} onPress={authenticate} />
   <AgoraButton text={'Auth'} textColor={GLOBAL_COLORS.white} onPress={authenticate}></AgoraButton>
  </>
}

export default Login;