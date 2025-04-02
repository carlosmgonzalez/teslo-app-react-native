import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props extends TouchableOpacityProps {
  children: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, iconName, style, ...rest }: Props) => {
  return (
    <TouchableOpacity style={[styles.button, style]} {...rest}>
      <Text style={styles.textButton}>{children}</Text>
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color={"rgb(255,255,255)"}
          style={{ marginTop: 2.5 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.dark.primary,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
    flexDirection: "row",
    gap: 4,
  },
  textButton: {
    color: "rgba(255,255,255,1)",
    fontSize: 16,
  },
});
