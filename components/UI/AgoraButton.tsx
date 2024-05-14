import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { GLOBAL_COLORS } from "../../constants/Colors";

interface AgoraButtonProps {
  onPress: () => {},
  text: string,
  textColor: `#${string}`
}

const AgoraButton: React.FC<AgoraButtonProps> = ({onPress, text, textColor}) => {
  return <Pressable
    style={({pressed}) => [styles.button, styles.buttonClose, pressed && styles.pressed]}
    onPress={onPress}>
    <Text style={{color: textColor}}>{text}</Text>
  </Pressable>
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    margin: 8,
    borderRadius: 4,
    padding: 10,
    elevation: 2,
    marginTop: 100,
    alignItems: 'center',
    minHeight: 40
  },
  buttonClose: {
    backgroundColor: GLOBAL_COLORS.primary,
  },
  pressed: {
    opacity: 0.7
  }
})

export default AgoraButton;