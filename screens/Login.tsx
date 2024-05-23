import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useFirebase } from "../store/firebaseContext";
import { useState } from "react";

const Login = () => {
  const {auth} = useFirebase();

  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');

  const handleCreateNewUser = () => {
    if (auth) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage, errorCode)
          // ..
        });
    }
  }

  const loginUser = () => {
    if (auth) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    }
  }

  return <View>
    <Text>Login Screesssn</Text>
    <TextInput
      style={styles.input}
      value={email}
      onChangeText={setEmail}
      placeholder={'Email'}
    />
    <TextInput
      style={styles.input}
      value={password}
      onChangeText={setPassword}
      placeholder={'Password'}
    />
    <Button title={'Criar'} onPress={loginUser}/>
  </View>
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default Login;
