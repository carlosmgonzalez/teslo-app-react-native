import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Link, router } from "expo-router";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";

const LoginScreen = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isPosting, setIsPosting] = useState(false);

  const { login } = useAuthStore();

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) return;
    setIsPosting(true);

    const wasSuccessful = await login(email, password);
    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }

    Alert.prompt("Error", "Usuario o contraseña no son correctos");
  };

  return (
    <View style={styles.container}>
      <View>
        <ThemedText type="title">Ingresar</ThemedText>
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
        />
        <ThemedTextInput
          onChangeText={(value) => setForm({ ...form, password: value })}
          value={form.password}
          placeholder="Contraseña"
          iconName="lock-closed-outline"
          isPassword
        />
      </View>
      <ThemedButton
        onPress={onLogin}
        disabled={isPosting}
        iconName="chevron-forward-outline"
      >
        Ingresar
      </ThemedButton>
      <View style={styles.footerContainer}>
        <ThemedText>¿No tienes cuenta?</ThemedText>
        <Link href={"/auth/register"}>
          <ThemedText style={styles.textLink}>Crea una</ThemedText>
        </Link>
      </View>
    </View>
  );
};

export default LoginScreen;

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
