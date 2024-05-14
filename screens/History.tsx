import { StyleSheet, Text, View } from "react-native";
import { GLOBAL_COLORS } from "../constants/Colors";
import React from "react";

const History: React.FC = () => {
  return <View style={styles.container}>
    <Text style={{color: GLOBAL_COLORS.accent}}>History</Text>
  </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GLOBAL_COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default History;