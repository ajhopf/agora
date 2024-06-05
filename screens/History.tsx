import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { GLOBAL_COLORS } from "../constants/Colors";
import CalendarComponent from "../components/History/CalendarComponent";

const History: React.FC = () => {
  return <View style={styles.container}>
    <Text style={styles.text}>Meditation History</Text>
    <CalendarComponent/>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.white,
    // justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    margin: 12
  }
});

export default History;