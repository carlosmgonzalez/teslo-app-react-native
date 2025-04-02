import { View, Text } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import ThemedTextInput from "./ThemedTextInput";
import { Product } from "@/core/products/interfaces/products";

interface Props {
  control: Control<Product>;
  name: keyof Product;
  rules: {};
  placeholder: string;
}

const TextInputRHF = ({ control, name, placeholder, rules }: Props) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <ThemedTextInput
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={onBlur}
          value={
            value !== undefined && value !== null ? String(value) : undefined
          }
        />
      )}
    />
  );
};

export default TextInputRHF;
