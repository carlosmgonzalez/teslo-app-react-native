import { View, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={40} />
    </View>
  );
};

export default LoadingIndicator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
