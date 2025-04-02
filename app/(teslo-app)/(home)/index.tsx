import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useProducts } from "@/presentation/products/hooks/useProducts";
import ProductList from "@/presentation/products/components/ProductList";
import LoadingIndicator from "@/presentation/theme/components/LoadingIndicator";
import { FAB } from "@/presentation/theme/components/FAB";
import { router } from "expo-router";

const HomeScreen = () => {
  const { productsQuery, loadNextPage } = useProducts();
  const { isLoading, data } = productsQuery;

  if (isLoading) return <LoadingIndicator />;

  return (
    <View style={styles.container}>
      <ProductList
        products={data?.pages.flatMap((page) => page) ?? []}
        loadNextPage={loadNextPage}
      />
      <FAB
        iconName="add-outline"
        onPress={() => router.push("/(teslo-app)/product/new")}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
});
