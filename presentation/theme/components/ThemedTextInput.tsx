import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { useThemeColor } from "../hooks/useThemeColor";
import Ionicos from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";

interface Props extends TextInputProps {
  iconName?: keyof typeof Ionicos.glyphMap;
  isPassword?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ThemedTextInput = ({
  iconName,
  isPassword,
  style,
  containerStyle,
  ...rest
}: Props) => {
  const textColor = useThemeColor({}, "text");
  const [isFocus, setIsFocus] = useState(false);
  const [hidePassword, setHidePassword] = useState(isPassword);

  return (
    <View style={containerStyle}>
      {iconName && (
        <Ionicos
          name={iconName}
          style={styles.icon}
          size={24}
          color={textColor}
        />
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: textColor,
            borderColor: isFocus ? Colors.dark.primary : "rgb(138, 138, 138)",
            paddingLeft: iconName ? 40 : 10,
          },
          style,
        ]}
        placeholderTextColor={"rgb(148,148,148)"}
        autoCapitalize="none"
        secureTextEntry={hidePassword}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
      />
      {isPassword && (
        <Ionicos
          onPress={() => setHidePassword(!hidePassword)}
          name={hidePassword ? "eye-outline" : "eye-off-outline"}
          style={styles.hideIcon}
          size={24}
          color={textColor}
        />
      )}
    </View>
  );
};

export default ThemedTextInput;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    paddingRight: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: 10,
    transform: [{ translateY: -12 }],
  },
  hideIcon: {
    position: "absolute",
    top: "50%",
    right: 10,
    transform: [{ translateY: -12 }],
  },
});
