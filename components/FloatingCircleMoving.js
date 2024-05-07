import { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

const FloatingCircleMoving = () => {
  const [position] = useState(new Animated.ValueXY({x: 0, y: 0}));

  const translationValues = [ // Array of offsets (up and down)
    { x: 10, y: -10 }, // Move up 10 units
    { x: -10, y: -10 },
    { x: -10, y: 10 },
    { x: 10, y: 10 },// Move down 10 units
    { x: 0, y: 0 }
  ];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(position,
          {
            toValue: translationValues[0],
            duration: 1000,
            useNativeDriver: true,
          }),
        Animated.timing(position,
          {
            toValue: translationValues[1],
            duration: 1000,
            useNativeDriver: true,
          }),
        Animated.timing(position,
          {
            toValue: translationValues[2],
            duration: 1000,
            useNativeDriver: true,
          }),
        Animated.timing(position,
          {
            toValue: translationValues[3],
            duration: 1000,
            useNativeDriver: true,
          }),
        Animated.timing(position,
          {
            toValue: translationValues[4],
            duration: 1000,
            useNativeDriver: true,
          })
      ]),
      {iterations: -1}
    )

    loop.start();

    return () => loop.stop;
  }, []);

  console.log(position)
  console.log(position.getTranslateTransform())

  return <Animated.View style={[styles.circle, position.getTranslateTransform()]}>
  </Animated.View>
};

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'blue'
  }
})

export default FloatingCircleMoving;