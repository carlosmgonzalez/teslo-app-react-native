import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";

const HomeScreen = () => {
  const primary = useThemeColor({}, "primary");

  return (
    <View style={styles.container}>
      <ThemedText style={{ fontFamily: "KanitBold", color: primary }}>
        index
      </ThemedText>
      <ThemedText style={{ fontFamily: "KanitRegular" }}>index</ThemedText>
      <ThemedText style={{ fontFamily: "KanitThin" }}>index</ThemedText>
      <ThemedText>index</ThemedText>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 10,
  },
});
