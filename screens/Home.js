import {StyleSheet, Text, View} from "react-native";
import {GLOBAL_COLORS} from "../constants/Colors";

const Home = () => {
  return <View style={styles.container}>
    <Text style={{color: GLOBAL_COLORS.accent}}>Home screen</Text>
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


export default Home;