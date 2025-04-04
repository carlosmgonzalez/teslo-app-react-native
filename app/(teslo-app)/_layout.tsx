import LogoutIconButton from "@/presentation/auth/components/LogoutIconButton";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator, Pressable } from "react-native";

const CheckAuthLayout = () => {
  const { status, checkStatus } = useAuthStore();
  const backgroundColor = useThemeColor({}, "background");

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unaunthenticated") return <Redirect href={"/auth/login"} />;

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor,
        },
        contentStyle: {
          backgroundColor,
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="(home)/index"
        options={{
          title: "Products",
          headerLeft: () => <LogoutIconButton />,
        }}
      />
      <Stack.Screen
        name="product/[id]"
        options={{
          title: "Product",
        }}
      />
    </Stack>
  );
};

export default CheckAuthLayout;
