import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedText } from "./ThemedText";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const backgroundColorOption = useThemeColor({}, "primary");
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isIncluded = selectedOptions.includes(option);

        return (
          <TouchableOpacity
            onPress={() => onSelect(option)}
            key={option}
            style={[
              styles.optionButton,
              {
                backgroundColor: isIncluded
                  ? backgroundColorOption
                  : "rgba(220,220,220,0.4)",
              },
            ]}
          >
            <ThemedText
              adjustsFontSizeToFit
              numberOfLines={1}
              style={{
                color: isIncluded ? "rgb(255,255,255)" : textColor,
              }}
            >
              {option}
            </ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ThemedButtonGroup;

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "space-between", gap: 10 },
  optionButton: {
    padding: 5,
    borderRadius: 5,
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
