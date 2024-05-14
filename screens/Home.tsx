import { Button, StyleSheet, View, Modal, Text, Alert, Pressable } from "react-native";
import React, { useState } from "react";

import FloatingCirclePulsating from "../components/Home/FloatingCirclePulsating";
import MeditationConfigurationModal from "../components/Home/MeditationConfigurationModal";

interface HomeProps {}

const Home: React.FC <HomeProps> = () => {
  const [timerKey, setTimerKey] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [inhale, setInhale] = useState<number>();
  const [exhale, setExhale] = useState<number>();

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
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <MeditationConfigurationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible} />
      <FloatingCirclePulsating
        inhale={4000}
        exhale={12000}
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