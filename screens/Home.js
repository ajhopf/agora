import { Animated, Button, StyleSheet, View } from "react-native";
import {GLOBAL_COLORS} from "../constants/Colors";
import { useEffect, useRef, useState } from "react";
import FloatingCircleMoving from "../components/FloatingCircleMoving";
import FloatingCirclePulsating from "../components/FloatingCirclePulsating";

const Home = () => {
  return (
    <View style={styles.container}>
      {/*<FloatingCircleMoving />*/}
      <FloatingCirclePulsating />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


export default Home;