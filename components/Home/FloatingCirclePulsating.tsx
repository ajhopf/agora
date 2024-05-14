import { Animated, Pressable, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { GLOBAL_COLORS } from "../../constants/Colors";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

interface FloatingCirclePulsatingProps {
  toggleTimer: () => void,
  inhale: number,
  exhale: number,
  timerKey: number,
  isPlaying: boolean
}

const FloatingCirclePulsating: React.FC<FloatingCirclePulsatingProps> = ({toggleTimer, inhale, exhale, timerKey, isPlaying}) => {
  const [scale] = useState<Animated.Value>(new Animated.Value(1));
  const [duration, setDuration] = useState<number>(15000)

  const loop: Animated.CompositeAnimation = Animated.loop(
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.4,
        duration: inhale,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: exhale,
        useNativeDriver: true,
      }),
    ]),{iterations: -1}
  )

  useEffect(() => {
    if (isPlaying) {
      loop.start()
    }

    return () => loop.stop()
  }, [isPlaying])

  const handlePress = () => {
    if (isPlaying) {
      loop.stop()
    } else {
      loop.start()
    }
    toggleTimer()
  }

  return <Pressable style={styles.container} onPress={handlePress}>
    <Animated.View style={[styles.circle, {transform: [{scale: scale}]} ]}>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        key={timerKey}
        duration={duration}
        colors={[GLOBAL_COLORS.primary, GLOBAL_COLORS.secondary , GLOBAL_COLORS.accent]}
        colorsTime={[duration,duration/2, 0]}
      >
        {({ remainingTime }) => {
          const hours = Math.floor(remainingTime / 3600)
          let minutes = Math.floor((remainingTime % 3600) / 60)
          let seconds = remainingTime % 60

          return <Text>{`${hours > 0 ? (hours + ':') : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</Text>}}
      </CountdownCircleTimer>
    </Animated.View>
  </Pressable>
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    borderRadius: 100,
    backgroundColor: GLOBAL_COLORS.secondary,
    overflow: 'hidden'
  },
  text: {

  }
})

export default FloatingCirclePulsating;