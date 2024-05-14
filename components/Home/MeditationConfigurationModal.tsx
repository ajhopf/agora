import { TouchableOpacity, Alert, Modal, Pressable, StyleSheet, Text, View, TextInput } from "react-native";
import React, { SetStateAction, useState } from "react";
import { GLOBAL_COLORS } from "../../constants/Colors";

interface ModalProps {
  duration: number,
  setDuration: React.Dispatch<SetStateAction<number>>,
  inhale: number,
  setInhale: React.Dispatch<SetStateAction<number>>,
  exhale: number,
  setExhale: React.Dispatch<SetStateAction<number>>,
  modalVisible: boolean,
  setModalVisible: React.Dispatch<SetStateAction<boolean>>,
  presetDurations: {text: string, value:number}[]
}

const MeditationConfigurationModal: React.FC<ModalProps> = (
  {
    inhale,
    setInhale,
    exhale,
    setExhale,
    duration,
    setDuration,
    modalVisible,
    setModalVisible,
    presetDurations
  }) => {
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
              <TextInput
                value={inhale.toString()}
                onChange={(value) => setInhale(+value)}
                keyboardType='number-pad'
                style={{backgroundColor: GLOBAL_COLORS.white, fontSize: 16, width: 30, textAlign: 'center'}}/>
              <Text style={styles.durationText}>seconds</Text>
            </View>
          </View>
          <View style={{flex: 1, marginLeft: 2}}>
            <Text style={styles.label}>Exhale</Text>
            <View style={styles.configSectionContainer}>
              <TextInput
                value={exhale.toString()}
                onChange={(value) => setExhale(+value)}
                keyboardType='number-pad'
                style={{backgroundColor: GLOBAL_COLORS.white, fontSize: 16, width: 30, textAlign: 'center'}}/>
              <Text style={styles.durationText}>seconds</Text>
            </View>
          </View>
        </View>

        <Pressable
          style={[styles.button, styles.buttonClose, {marginTop: 100}]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.durationText}>Hide Modal</Text>
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
    alignItems: 'center'
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