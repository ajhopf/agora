import { Button, StyleSheet, View, Modal, Text, Alert, Pressable } from "react-native";
import React, { useState } from "react";

import FloatingCirclePulsating from "../components/Home/FloatingCirclePulsating";
import MeditationConfigurationModal from "../components/Home/MeditationConfigurationModal";
import useMeditationConfig from "../hooks/useMeditationConfig";

interface HomeProps {}

const Home: React.FC <HomeProps> = () => {
  const [timerKey, setTimerKey] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [configModalVisible, setConfigModalVisible] = useState<boolean>(false)
  const {
    duration,
    setDuration,
    inhale,
    setInhale,
    exhale,
    setExhale,
    presetDurations
  } = useMeditationConfig();

  const restartTimer = (): void => {
    setTimerKey(prevState => prevState + 1)
    setIsPlaying(false)
  }

  const toggleTimer = (): void => {
    setIsPlaying(prevState => {
      return !prevState
    })
  }

  const openModal = (): void => {
    setConfigModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <MeditationConfigurationModal
        presetDurations={presetDurations}
        duration={duration}
        setDuration={setDuration}
        inhale={inhale}
        setInhale={setInhale}
        exhale={exhale}
        setExhale={setExhale}
        modalVisible={configModalVisible}
        setModalVisible={setConfigModalVisible} />
      <FloatingCirclePulsating
        duration={duration}
        inhale={inhale}
        exhale={exhale}
        timerKey={timerKey}
        isPlaying={isPlaying}
        toggleTimer={toggleTimer}/>
      <View style={styles.buttonsContainer}>
        <Button onPress={restartTimer} title={'Restart'} />
        <Button onPress={openModal} title={'Configuration'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 24
  }
});


export default Home;