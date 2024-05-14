import { StyleSheet, View} from "react-native";
import React, { useState } from "react";

import MeditationCircle from "../components/Home/MeditationCircle";
import MeditationConfigurationModal from "../components/Home/MeditationConfigurationModal";
import useMeditationConfig from "../hooks/useMeditationConfig";
import AgoraButton from "../components/UI/AgoraButton";
import { GLOBAL_COLORS } from "../constants/Colors";

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
      <MeditationCircle
        duration={duration}
        inhale={inhale}
        exhale={exhale}
        timerKey={timerKey}
        isPlaying={isPlaying}
        toggleTimer={toggleTimer}/>
      {
        !isPlaying && <View style={styles.buttonsContainer}>
          <AgoraButton onPress={restartTimer} text={'Restart'} textColor={GLOBAL_COLORS.white} />
          <AgoraButton onPress={openModal} text={'Configuration'} textColor={GLOBAL_COLORS.white} />
        </View>
      }
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
    marginBottom: 24
  }
});


export default Home;