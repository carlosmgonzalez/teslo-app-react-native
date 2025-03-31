import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const RegisterScreen = () => {
  const { register } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: "",
    repeatPassword: "",
  });

  const onRegister = async () => {
    const { email, fullName, password, repeatPassword } = form;
    if (password !== repeatPassword) return;
    if (email.length === 0 || fullName.length === 0 || password.length === 0)
      return;

    const wasSuccessful = await register(email, fullName, password);
    if (wasSuccessful) return router.replace("/(teslo-app)/(home)");

    Alert.alert("Error", "Credentials are wrong");
  };

  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="title">Crear cuenta</ThemedText>
        <ThemedText style={styles.subtitle}>
          Por favor, ingrese para continuar
        </ThemedText>
      </View>
      <View style={styles.inputContainer}>
        <ThemedTextInput
          onChangeText={(value) => setForm({ ...form, email: value })}
          value={form.email}
          placeholder="Correo electronico"
          keyboardType="email-address"
          iconName="mail-outline"
          autoCapitalize="none"
        />
        <ThemedTextInput
          onChangeText={(value) => setForm({ ...form, fullName: value })}
          value={form.fullName}
          placeholder="Nombre completo"
          iconName="person-outline"
          autoCapitalize="words"
        />
        <ThemedTextInput
          onChangeText={(value) => setForm({ ...form, password: value })}
          value={form.password}
          placeholder="Contraseña"
          iconName="lock-closed-outline"
          autoCapitalize="none"
          isPassword
        />
        <ThemedTextInput
          onChangeText={(value) => setForm({ ...form, repeatPassword: value })}
          value={form.repeatPassword}
          placeholder="Repetir contraseña"
          iconName="lock-closed-outline"
          autoCapitalize="none"
          isPassword
        />
      </View>
      <ThemedButton onPress={onRegister} iconName="chevron-forward-outline">
        Crear cuenta
      </ThemedButton>
      <View style={styles.footerContainer}>
        <ThemedText>¿Ya tienes cuenta?</ThemedText>
        <Link href={"/auth/login"}>
          <ThemedText style={styles.textLink}>Ingresar</ThemedText>
        </Link>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 25,
    gap: 12,
  },
  subtitle: {
    fontFamily: "KanitRegular",
    color: "rgb(138, 138, 138)",
  },
  inputContainer: {
    width: "100%",
    gap: 8,
  },
  footerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  textLink: {
    color: Colors.dark.primary,
  },
});
