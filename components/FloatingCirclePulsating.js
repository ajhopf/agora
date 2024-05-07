import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { GLOBAL_COLORS } from "../constants/Colors";

const FloatingCirclePulsating = () => {
  const [scale] = useState(new Animated.Value(1));

  const inhale  = 4000;
  const exhale = 12000;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale,
          {
            toValue: 1.4,
            duration: inhale,
            useNativeDriver: true,
          }),
        Animated.timing(scale,
          {
            toValue: 1,
            duration: exhale,
            useNativeDriver: true,
          }),
      ]),
      {iterations: -1}
    )

    loop.start();

    return () => loop.stop;
  }, []);

  console.log(scale)

  return <Animated.View style={[styles.circle, {transform: [{scale: scale}]}]}>
  </Animated.View>
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: GLOBAL_COLORS.secondary,
    overflow: 'hidden'
  }
})

export default FloatingCirclePulsating;