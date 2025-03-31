import { Pressable } from "react-native";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";

const LogoutIconButton = () => {
  const { logout } = useAuthStore();

  return (
    <Pressable
      onPress={logout}
      style={({ pressed }) => ({
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Ionicons name="log-out-outline" size={24} color={"rgb(255, 87, 87)"} />
    </Pressable>
  );
};

export default LogoutIconButton;
