import { TouchableOpacity, Alert, Modal, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { SetStateAction, useState } from "react";
import { GLOBAL_COLORS } from "../../constants/Colors";

interface ModalProps {
  modalVisible: boolean,
  setModalVisible: React.Dispatch<SetStateAction<boolean>>
}

const presetDurations = [
  {
    text: '5 minutes',
    value: 300
  },
  {
    text: '10 minutes',
    value: 600
  },
  {
    text: '15 minutes',
    value: 900
  },
  {
    text: '20 minutes',
    value: 1200
  },
  {
    text: '30 minutes',
    value: 1800
  },
  {
    text: '60 minutes',
    value: 3600
  }
]

const MeditationConfigurationModal: React.FC<ModalProps> = ({modalVisible, setModalVisible}) => {
  const [duration, setDuration] = useState(600)

  return <Modal
    animationType='slide'
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      Alert.alert('Modal has been closed.');
      setModalVisible(!modalVisible);
    }}
  >
    <Pressable
      onPress={() => setModalVisible(false)}
      style={styles.overlay}
    >
      <Pressable
        onPress={(event => event.stopPropagation())}
        style={styles.modalContainer}>
        <Text style={styles.label}>Duration</Text>
        <View style={styles.configSectionContainer}>
          {presetDurations.map((item, index) => (
            <Pressable
              key={index}
              style={({pressed}) => [pressed && styles.pressed, duration === item.value ? styles.selectedDuration : undefined]}
              onPress={() => setDuration(item.value)}>
              <Text style={styles.durationText}>{item.text}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.inhaleExhaleContainer}>
          <View style={{flex: 1, marginRight: 2}}>
            <Text style={styles.label}>Inhale</Text>
            <View style={styles.configSectionContainer}>
              <TextInput/>
            </View>
          </View>
          <View style={{flex: 1, marginLeft: 2}}>
            <Text style={styles.label}>Exhale</Text>
            <View style={styles.configSectionContainer}>
              <TextInput
                keyboardType='number-pad'
                style={{backgroundColor: GLOBAL_COLORS.white, fontSize: 16, width: 30, textAlign: 'center'}}/>
              <Text>seconds</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.button, styles.buttonClose, {marginTop: 100}]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text>Hide Modal</Text>
        </Pressable>
      </Pressable>
    </Pressable>
  </Modal>
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: GLOBAL_COLORS.white,
    borderRadius: 4,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0,height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: GLOBAL_COLORS.primary,
    margin: 12
  },
  pressed: {
    opacity: 0.5
  },
  configSectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: GLOBAL_COLORS.primary,
    padding: 12,
    width: '100%',
    justifyContent: 'space-evenly',
    borderRadius: 4,
  },
  durationText: {
    color: GLOBAL_COLORS.white,
    padding: 8,
  },
  selectedDuration: {
    backgroundColor: GLOBAL_COLORS.secondary,
    borderRadius: 4,
  },
  inhaleExhaleContainer: {
    flexDirection: 'row'
  },
  button: {
    borderRadius: 4,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: GLOBAL_COLORS.primary,
  },
})

export default MeditationConfigurationModal;