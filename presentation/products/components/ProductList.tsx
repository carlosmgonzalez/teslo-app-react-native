import { Product } from "@/core/products/interfaces/products";
import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import ProductCard from "./ProductCard";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";

interface Props {
  products: Product[];
  loadNextPage: () => void;
}

const ProductList = ({ products, loadNextPage }: Props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient();

  const onPullToRefresh = async () => {
    setIsRefreshing(true);

    queryClient.invalidateQueries({
      queryKey: ["products", "infinite"],
    });

    setIsRefreshing(false);
  };

  return (
    <FlashList
      data={products}
      numColumns={2}
      keyExtractor={(product) => product.id}
      renderItem={({ item }) => <ProductCard product={item} />}
      onEndReached={loadNextPage}
      onEndReachedThreshold={0.8}
      estimatedItemSize={260}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onPullToRefresh} />
      }
    />
  );
};

export default ProductList;
