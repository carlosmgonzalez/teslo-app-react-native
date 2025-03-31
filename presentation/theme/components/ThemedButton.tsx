import { Text, Pressable, StyleSheet, PressableProps } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props extends PressableProps {
  children: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, iconName, ...rest }: Props) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? { opacity: 0.7 } : { opacity: 1 },
      ]}
      {...rest}
    >
      <Text style={styles.textButton}>{children}</Text>
      {iconName && (
        <Ionicons
          name={iconName}
          size={18}
          color={"rgb(255,255,255)"}
          style={{ marginTop: 2.5 }}
        />
      )}
    </Pressable>
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
