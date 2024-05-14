import React, { useEffect, useState } from "react";
import { View, Button } from "react-native";
import { Audio } from "expo-av";

const SoundPlayer = () => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    await sound.playAsync();
  }

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  }

  useEffect(() => {
    const getSound = async () => {
      const {sound} = await Audio.Sound.createAsync(require('../../assets/sounds/double_bell.mp3'))
      setSound(sound);
    }

    getSound();

    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, []);

  return <View>
    <Button title="Play Sound" onPress={playSound} />
    <Button title="Stop Sound" onPress={stopSound} />
  </View>
}

export default SoundPlayer;