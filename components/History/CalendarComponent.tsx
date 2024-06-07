import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Modal, Pressable, StyleSheet, View, Text } from "react-native";
import { useMeditation } from "../../store/meditationContext";
import { MarkedDates } from "react-native-calendars/src/types";
import Meditation from "../../models/Meditation";

const CalendarComponent: React.FC = () => {
  const { userMeditations} = useMeditation();
  const [meditationDates, setMeditationDates] = useState<MarkedDates>()
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);

  const handleDayPress = (day: { dateString: string }) => {
    const meditationOnDay = userMeditations?.find(
      (meditation) =>
        new Date(meditation.date).toISOString().slice(0, 10) === day.dateString
    );
    setSelectedMeditation(meditationOnDay || null);
  };

  useEffect(() => {
    const markedDates: MarkedDates = {};

    userMeditations?.forEach((meditation: Meditation) => {
      const meditationDate = new Date(meditation.date).toISOString().slice(0, 10);
      console.log(meditationDate);
      markedDates[meditationDate] = {selected: true}
    });

    setMeditationDates(markedDates);
  }, [userMeditations]);

  return <>

    <Calendar
      style={styles.calendar}
      onDayPress={handleDayPress}
      markedDates={meditationDates}
    />
    <Modal
      animationType="fade"
      transparent={true}
      visible={selectedMeditation !== null}
      onRequestClose={() => setSelectedMeditation(null)}
    >
      <Pressable style={styles.modalContainer} onPress={() => setSelectedMeditation(null)}>
        <View style={styles.modalContent}>
          <Text >Meditation Details:</Text>
          {selectedMeditation && (
            <Text>Duration: {selectedMeditation.duration / 60}min</Text>
          )}
        </View>
      </Pressable>
    </Modal>
  </>
}

const styles = StyleSheet.create({
  calendar: {
    padding: 16,
    width: '100%',
    margin: 0
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
})

export default CalendarComponent;