import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Redirect, router, Stack, useLocalSearchParams } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import { useProduct } from "@/presentation/products/hooks/useProduct";
import ProductImages from "@/presentation/products/components/ProductImages";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Gender, Product, Size } from "@/core/products/interfaces/products";
import { useEffect } from "react";
import ThemedButtonGroup from "@/presentation/theme/components/ThemedButtonGroup";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import { useForm, Controller } from "react-hook-form";
import { useCameraStore } from "@/presentation/camera/store/useCameraStore";

const ProductScreen = () => {
  const { selectedImages, clearImage } = useCameraStore();

  const { id }: { id: string } = useLocalSearchParams();
  const textColor = useThemeColor({}, "text");

  const { productQuery, productMutation } = useProduct(id);
  const { data, isLoading } = productQuery;

  const sizes: string[] = Object.values(Size);
  const genders = Object.values(Gender);

  const { handleSubmit, control, reset, setValue, getValues } =
    useForm<Product>({
      defaultValues: {
        title: "",
        images: [],
        slug: "",
        description: "",
        price: 0,
        stock: 0,
        sizes: [],
        gender: undefined,
      },
    });

  useEffect(() => {
    return () => {
      clearImage();
    };
  }, []);

  useEffect(() => {
    if (!data) return;
    reset(data);
  }, [data, selectedImages, reset]);

  if (isLoading) return <LoadingIndicator />;
  if (!data) return <Redirect href="/" />;

  const product = data!;

  const onSubmit = (data: Product) => {
    if (isNaN(Number(data.stock)) || isNaN(Number(data.price))) {
      Alert.alert("Error", "Price and size should be a number");
      return;
    }

    data.stock = Number(data.stock);
    data.price = Number(data.price);

    productMutation.mutate({
      ...data,
      images: [...data.images, ...selectedImages],
    });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={productQuery.isFetching}
            onRefresh={async () => {
              await productQuery.refetch();
            }}
          />
        }
      >
        <View style={styles.container}>
          <Stack.Screen
            options={{
              headerRight: () => (
                <TouchableOpacity
                  onPressIn={() => {
                    router.push("/camera");
                  }}
                >
                  <Ionicons name="camera-outline" size={24} color={textColor} />
                </TouchableOpacity>
              ),
              title: product.title,
            }}
          />
          <View style={{ gap: 10 }}>
            <Controller
              control={control}
              name="images"
              render={({ field: { value } }) => (
                <ProductImages images={[...value, ...selectedImages]} />
              )}
            />

            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  placeholder="Title"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="slug"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  placeholder="Slug"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  placeholder="Description"
                  onChangeText={onChange}
                  value={value}
                  multiline
                  numberOfLines={5}
                />
              )}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 10,
            }}
          >
            <Controller
              control={control}
              name="price"
              rules={{
                required: true,
                min: 0,
              }}
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  placeholder="Price"
                  onChangeText={onChange}
                  value={value.toString()}
                  containerStyle={{ flex: 1 }}
                />
              )}
            />
            <Controller
              control={control}
              name="stock"
              render={({ field: { onChange, value } }) => (
                <ThemedTextInput
                  placeholder="Stock"
                  onChangeText={onChange}
                  value={value.toString()}
                  containerStyle={{ flex: 1 }}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="sizes"
            render={({ field: { onChange, value } }) => (
              <ThemedButtonGroup
                options={sizes}
                selectedOptions={value}
                onSelect={(option: string) => {
                  const isIncluded = value.includes(option as Size);
                  if (isIncluded) {
                    onChange(value.filter((opt: string) => opt !== option));
                    return;
                  }
                  onChange([...value, option]);
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <ThemedButtonGroup
                options={genders}
                selectedOptions={[value]}
                onSelect={onChange}
              />
            )}
          />
          <ThemedButton
            onPress={handleSubmit((data) => onSubmit(data))}
            iconName="save-outline"
            style={{ marginVertical: 20 }}
          >
            Save
          </ThemedButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    gap: 10,
  },
  sizeButton: {
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
