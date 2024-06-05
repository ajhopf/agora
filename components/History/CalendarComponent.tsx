import React from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { useMeditation } from "../../store/meditationContext";

const CalendarComponent: React.FC = () => {
  const {meditationDates} = useMeditation();

  return <Calendar
    style={styles.calendar}
    markedDates={meditationDates}
  />
}

const styles = StyleSheet.create({
  calendar: {
    padding: 16,
    width: '100%',
    margin: 0
  }
})

export default CalendarComponent;